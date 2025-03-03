import { useEffect, useState } from 'react';

import { DocumentInput } from '../../inputs/documents/DocumentInput';
import { DocumentItem } from '../../inputs/documents/DocumentItem';

import { documentClientsButtons } from '../../../../lib/mocks/add-realty-mock';
import { addHandlersForButtons } from '../../../../utils/utils';

export const DocumentsList = ({
  formProps = {},
  handleDocuments = () => {},
  buttonsHandlers = {},
  filesFromBack = [],
  handleDeleteDocument = () => {},
}) => {
  const [files, setFiles] = useState([]);
  const [buttons, setButtons] = useState(documentClientsButtons);

  const handleDeleteClick = ({ item, isEdit, handleCloseDialog }) => {
    if (isEdit) {
      setFiles(prevFiles => {
        const filteredFiles = prevFiles.filter(
          prevFile => prevFile.name !== item.name
        );

        return filteredFiles;
      });

      handleCloseDialog();
    } else {
      handleDeleteDocument(item, handleCloseDialog);
    }
  };

  const handleChange = async event => {
    const filesArray = Array.from(event.target.files);
    let updatedFiles = [];

    setFiles(prevFiles => {
      const existingFileNames = new Set(
        [...prevFiles, ...filesFromBack].map(file => file.name)
      );

      const newFiles = filesArray.filter(
        file => !existingFileNames.has(file.name)
      );

      updatedFiles = [...prevFiles, ...newFiles];

      return updatedFiles;
    });

    if (formProps && formProps?.setFieldValue) {
      await formProps.setFieldValue('documents', filesArray); // to triger submit button
    }

    if (handleDocuments) {
      handleDocuments(updatedFiles);
    }
  };

  useEffect(() => {
    const updatedButtons = addHandlersForButtons(buttons, buttonsHandlers);

    setButtons(updatedButtons);
  }, []);

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-blackColor">
          Documents & files
        </span>
      </div>

      <DocumentInput handleChange={handleChange} />

      {files.map((item, fileIndex) => {
        return (
          <DocumentItem
            key={`${item.name}${fileIndex}`}
            id={item.id}
            item={item}
            isEdit={true}
            isDisabled={true}
            buttons={buttons}
            buttonsHandlersProps={{
              handleDeleteDocument: handleDeleteClick,
            }}
          />
        );
      })}

      {filesFromBack.map((item, fileIndex) => {
        return (
          <DocumentItem
            key={item.id}
            id={item.id}
            item={item}
            buttons={buttons}
            buttonsHandlersProps={{
              handleDeleteDocument: handleDeleteClick,
            }}
          />
        );
      })}
    </div>
  );
};
