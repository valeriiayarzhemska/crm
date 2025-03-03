import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  useDeleteDocumentMutation,
  useGetDocumentsForRealtyQuery,
  useUpdateDocumentMutation,
} from '../../../../../redux/services/documents/documentsApi';

import { Loader } from '../../../../ui/Loader';
import { LoaderProgress } from '../../../../ui/LoaderProgress';
import { DocumentItem } from '../../../inputs/documents/DocumentItem';
import { BadgeSelect } from '../../../BadgeSelect';

import {
  documentButtons,
  documentButtonsName,
} from '../../../../../lib/mocks/add-realty-mock';
import { handleResponseError } from '../../../../../utils/data';
import { closeDialog, showError } from '../../../../../utils/ui';
import { apiUrl } from '../../../../../redux/services/api';
import { links } from '../../../../../data/links';

export const DocumentsUpload = ({
  realtyId,
  formProps = {},
  files = {},
  setFiles = () => {},
  setSelectedDocuments = () => {},
  selectedDocumentsFromBack = {},
  setSelectedDocumentsFromBack = () => {},
  title = '',
  handleMovingDocuments = () => {},
  handleMovingDocumentsFromBack = () => {},
  titlesForBadge = [],
  isActiveButton = false,
  isEdit = false,
}) => {
  const [error, setError] = useState('');
  const [selectedDoc, setSelectedDoc] = useState({});
  const [isChangeName, setIsChangeName] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [buttons, setButtons] = useState(documentButtons);
  const [hasCheckedDocuments, setHasCheckedDocuments] = useState(false);

  const userToken = useSelector(selectUserToken);
  const {
    data: documents = [],
    isLoading: isDocumentsLoading,
    error: documentsError,
  } = useGetDocumentsForRealtyQuery({ token: userToken, id: realtyId }, { skip: !realtyId });
  const [
    updateDocName,
    { isLoading: isUpdatingLoading, error: updatingError },
  ] = useUpdateDocumentMutation();
  const [
    deleteDocName,
    { isLoading: isDeletingLoading, error: deletingError },
  ] = useDeleteDocumentMutation();

  const handleCheckClick = (item, title, setState) => {
    setState(prevDocuments => {
      const hasSelectedTitle = Object.prototype.hasOwnProperty.call(
        prevDocuments,
        title
      );
      const selectedTitleData = prevDocuments?.[title];
      let selectedDataToAdd;

      if (hasSelectedTitle) {
        const selectedDoc = selectedTitleData.find(
          prevFile => prevFile.file['name'] === item.file['name']
        );

        if (!selectedDoc) {
          selectedDataToAdd = {
            ...prevDocuments,
            [title]: [...selectedTitleData, item],
          };
        } else {
          const newData = selectedTitleData.filter(
            prevFile => prevFile.file['name'] !== item.file['name']
          );

          selectedDataToAdd = { ...prevDocuments, [title]: newData };
        }
      } else {
        selectedDataToAdd = { ...prevDocuments, [title]: [item] };
      }

      if (selectedDataToAdd?.[title]?.length > 0) {
        setHasCheckedDocuments(true);
      } else {
        setHasCheckedDocuments(false);
      }

      return selectedDataToAdd;
    });
  };

  const handleTitleSelect = async props => {
    if (
      selectedDocumentsFromBack &&
      Object.prototype.hasOwnProperty.call(selectedDocumentsFromBack, title)
    ) {
      await handleMovingDocumentsFromBack({
        titleToAdd: props.title,
        titleToDelete: title,
      });

      setSelectedDocumentsFromBack(prevDocuments => {
        const newSelectedDocuments = prevDocuments;

        delete newSelectedDocuments?.[title];

        return newSelectedDocuments;
      });
    } else {
      await handleMovingDocuments({
        titleToAdd: props.title,
        titleToDelete: title,
      });

      setSelectedDocuments(prevDocuments => {
        const newSelectedDocuments = prevDocuments;

        delete newSelectedDocuments?.[title];

        return newSelectedDocuments;
      });
    }

    setHasCheckedDocuments(false);
  };

  const handleDownLoadDocument = ({ item }) => {
    const downloadUrl = `${apiUrl}${links.documents}/${item?.id}/download`;

    window.open(downloadUrl);
  };

  const handleRenameDocument = async ({ file, values, handleClose }) => {
    setIsLoading(true);
    setSelectedDoc(file);
    setError(null);

    const response = await updateDocName({
      token: userToken,
      data: values,
      id: file.id,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      updatingError,
      () => closeDialog({ handleClose })
    );

    if (errorStatus) {
      setError(errorStatus);
    }
  };

  const handleDeleteDocument = async (item, handleCloseDialog) => {
    setIsLoading(true);
    setError(null);

    const response = await deleteDocName({
      token: userToken,
      id: item.id,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deletingError,
      () => closeDialog({ setState: setIsDeleteClick })
    );

    if (errorStatus) {
      setError(errorStatus);
    } else {
      handleCloseDialog();
    }

    setIsLoading(false);
  };

  const handleDeleteClick = ({
    id,
    item,
    title,
    isEdit,
    isActiveButton,
    handleCloseDialog,
  }) => {
    setSelectedDoc(item);

    if (isEdit || isActiveButton) {
      setFiles(prevFiles => {
        let newPrevFiles = [];

        if (prevFiles?.[title]) {
          const filteredFiles = prevFiles[title].filter(
            prevFile => prevFile.id !== id
          );
          newPrevFiles = { ...prevFiles, [title]: filteredFiles };
        } else {
          newPrevFiles = prevFiles;
        }

        //document.getElementsByClassName('docs-realty').value = newPrevFiles;
        return newPrevFiles;
      });

      handleCloseDialog();
    } else {
      handleDeleteDocument(item, handleCloseDialog);
    }
  };

  const addHandlersForButtons = buttons => {
    return buttons.map(button => {
      if (button.handlerKeyname === documentButtonsName.download) {
        return { ...button, handleClick: handleDownLoadDocument };
      } else {
        return button;
      }
    });
  };

  useEffect(() => {
    const updatedButtons = addHandlersForButtons(buttons);

    setButtons(updatedButtons);
  }, []);

  useEffect(() => {
    showError(error);
  }, [error]);

  useEffect(() => {
    if (!isDocumentsLoading && documents) {
      setIsLoadingDocs(false);
    }
  }, [documents, isDocumentsLoading]);

  return (
    <>
      {isLoading && <LoaderProgress />}

      {isLoadingDocs && <Loader />}

      {!isLoadingDocs &&
      ((files?.[title] && files?.[title]?.length) ||
        (documents?.[title] && documents?.[title]?.length)) ? (
          <div className="flex flex-col gap-3 sm:w-[60%]">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 sm:h-[25.6px]">
              <span className="text-ml text-blackColor font-bold">{title}</span>

              {hasCheckedDocuments && (
                <BadgeSelect
                  item={{
                    title: 'Move to category',
                    color:
                      'text-blackColor border-[1px] border-gray-400 bg-whiteColor',
                    selectData: titlesForBadge,
                    name: 'title',
                    handleBadgeSelect: handleTitleSelect,
                  }}
                />
              )}
            </div>

            {files?.[title] && files?.[title]?.length ? (
              <>
                {files[title].map((item, fileIndex) => {
                  return (
                    <DocumentItem
                      key={item.id}
                      id={item.id}
                      item={item.file}
                      title={title}
                      buttons={buttons}
                      buttonsHandlersProps={{
                        handleRenameDocument,
                        handleDeleteDocument: handleDeleteClick,
                      }}
                      isActiveButton={isActiveButton}
                      isEdit={isEdit}
                      setState={setSelectedDocuments}
                      handleCheckClick={handleCheckClick}
                    />
                  );
                })}
              </>
            ) : null}

            {documents?.[title] && documents?.[title]?.length ? (
              <>
                {documents[title].map((item, fileIndex) => {
                  return (
                    <DocumentItem
                      key={item.id}
                      id={item.id}
                      item={item}
                      title={title}
                      buttons={buttons}
                      buttonsHandlersProps={{
                        handleRenameDocument,
                        handleDeleteDocument: handleDeleteClick,
                      }}
                      isActiveButton={isActiveButton}
                      isEdit={isEdit}
                      setState={setSelectedDocumentsFromBack}
                      handleCheckClick={handleCheckClick}
                    />
                  );
                })}
              </>
            ) : null}
          </div>
        ) : null}
    </>
  );
};
