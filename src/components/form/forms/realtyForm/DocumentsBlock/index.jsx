import { useEffect, useState } from 'react';
import cn from 'classnames';

import { colors, errorMessages } from '../../../../../data/constants';
import { titlesForDocuments } from '../../../../../lib/mocks/add-realty-mock';
import { DocumentsUpload } from '../DocumentsUpload';
import { BadgeSelect } from '../../../BadgeSelect';
import { handleMovingFiles, transformTitles } from '../../../../../utils/ui';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { generateId } from '../../../../../utils/utils';
import { transformDocumentsData } from '../../../../../utils/data';
import {
  useAddDocumentsMutation,
  useUpdateDocumentCategoryMutation,
} from '../../../../../redux/services/documents/documentsApi';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ToasterComponent } from '../../../../ui/ToasterComponent';
import { LoaderProgress } from '../../../../ui/LoaderProgress';
import { DocumentInput } from '../../../inputs/documents/DocumentInput';

export const DocumentsBlock = ({
  realtyId,
  formProps = {},
  inputsList = [],
}) => {
  const [titles, setTitles] = useState(titlesForDocuments);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [selectDataTitles, setSelectDataTitles] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [selectedDocumentsFromBack, setSelectedDocumentsFromBack] = useState(
    {}
  );

  const userToken = useSelector(selectUserToken);
  /* const {
    data: streetNumber,
    isFetching: isStreetNumberLoading,
    error: streetNumberError,
  } = useGetStreetNumberQuery(
    { token: userToken, id: inputValue },
    { skip: !inputValue || !userToken }
  ); */
  const [
    addDocuments,
    { isLoading: isAddingLoading, error: addingError, isError },
  ] = useAddDocumentsMutation();
  const [
    updateDocCategory,
    { isLoading: isUpdateDocCategoryLoading, error: updateDocCategoryError },
  ] = useUpdateDocumentCategoryMutation();

  const handleChoosingTitle = ({ title }) => {
    setSelectedTitle(title);
  };

  const handleSubmit = async () => {
    let hasFiles;

    for (const [key, value] of Object.entries(files)) {
      if (value && value?.length > 0) {
        hasFiles = true;
      } else {
        hasFiles = false;
      }
    }

    if (!hasFiles) {
      setIsActiveButton(false);

      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = transformDocumentsData(files);

    const response = await addDocuments({
      data: formData,
      token: userToken,
      realty_id: realtyId,
    });

    if (response?.errors || response?.error) {
      toast.error(response?.error?.data?.message || errorMessages.wentWrong, {
        error: true,
        action: {},
      });

      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsActiveButton(false);
      setIsEdit(false);
    }
  };

  function handleChange(event) {
    const titleToAdd = selectedTitle ? selectedTitle : titlesForDocuments[0];
    const filesArray = Array.from(event.target.files);

    const newFiles = filesArray.map(file => {
      return { file: file, id: generateId() };
    });

    setFiles(prevFiles => {
      const titleData = prevFiles?.[titleToAdd] ? prevFiles[titleToAdd] : [];

      return {
        ...prevFiles,
        [titleToAdd]: [...titleData, ...newFiles],
      };
    });

    setIsActiveButton(true);
  }

  const handleMovingDocuments = ({ titleToAdd, titleToDelete }) => {
    handleMovingFiles({
      titleToAdd,
      titleToDelete,
      setState: setFiles,
      selectedFiles: selectedDocuments,
      files: files,
      filterKey: 'id',
    });

    setIsActiveButton(true);
  };

  const handleMovingDocumentsFromBack = async ({
    titleToAdd,
    titleToDelete,
  }) => {
    setIsLoading(true);
    setError(null);

    const assignCategory = titles.indexOf(titleToAdd);
    const data = selectedDocumentsFromBack?.[titleToDelete].map(doc => {
      return { assign_category: assignCategory, id: doc.id };
    });

    const response = await updateDocCategory({
      data: { documents: data },
      token: userToken,
    });

    if (response?.errors || response?.error) {
      toast.error(errorMessages.wentWrong, {
        error: true,
        action: {},
      });

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    transformTitles(
      titles,
      setSelectDataTitles,
      'text-whiteColor border-yellowColor bg-yellowColor'
    );
  }, [titles]);

  return (
    <>
      {isLoading && <LoaderProgress />}

      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <DocumentInput
          className={'docs-realty'}
          handleChange={handleChange}
        />

        <BadgeSelect
          item={{
            title: 'Choose a category',
            color: 'text-whiteColor border-yellowColor bg-yellowColor',
            selectData: selectDataTitles,
            name: 'title',
            handleBadgeSelect: handleChoosingTitle,
          }}
        />
      </div>

      <div
        className={cn('flex flex-col gap-6 w-full', {
          'p-2 border-2 border-dashed border-gray-200 bg-gray-50 rounded':
            isActiveButton,
        })}
      >
        {titles.map((title, index) => {
          const titlesForBadge = selectDataTitles.filter(
            badgeTitle => badgeTitle !== title
          );

          return (
            <DocumentsUpload
              key={index}
              realtyId={realtyId}
              files={files}
              setFiles={setFiles}
              setSelectedDocuments={setSelectedDocuments}
              selectedDocumentsFromBack={selectedDocumentsFromBack}
              setSelectedDocumentsFromBack={setSelectedDocumentsFromBack}
              title={title}
              titlesForBadge={titlesForBadge}
              isActiveButton={isActiveButton}
              isEdit={isEdit}
              handleMovingDocuments={handleMovingDocuments}
              handleMovingDocumentsFromBack={handleMovingDocumentsFromBack}
            />
          );
        })}
      </div>

      {isActiveButton && (
        <ButtonTemplate
          text={'Save'}
          bgColor={'bg-redColor border-redColor'}
          handleClick={handleSubmit}
        />
      )}
    </>
  );
};
