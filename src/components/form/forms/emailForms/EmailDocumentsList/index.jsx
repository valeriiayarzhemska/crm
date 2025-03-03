import { useState } from 'react';

import { EmailDocumentsItem } from '../EmailDocumentsItem';

import { DocumentInput } from '../../../inputs/documents/DocumentInput';
import { emailsValuesTitles } from '../../../../../lib/mocks/email-mock';

export const EmailDocumentsList = ({ formProps = {} }) => {
  const [files, setFiles] = useState([]);

  const handleChange = async event => {
    const filesArray = Array.from(event.target.files);
    let updatedFiles = [];

    setFiles(prevFiles => {
      const existingFileNames = new Set(prevFiles.map(file => file.name));

      const newFiles = filesArray.filter(
        file => !existingFileNames.has(file.name)
      );

      updatedFiles = [...prevFiles, ...newFiles];

      return updatedFiles;
    });

    if (formProps && formProps?.setFieldValue) {
      await formProps.setFieldValue(
        emailsValuesTitles.attachments,
        updatedFiles
      );
    }
  };

  const handleDelete = async file => {
    let updatedFiles = [];

    setFiles(prevFiles => {
      updatedFiles = prevFiles.filter(prevFile => prevFile.name !== file.name);

      return updatedFiles;
    });

    if (formProps && formProps?.setFieldValue) {
      await formProps.setFieldValue(
        emailsValuesTitles.attachments,
        updatedFiles
      );
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <div>
        <span className="text-ml text-blackColor font-medium">Attachments</span>
      </div>

      <DocumentInput handleChange={handleChange} />

      {files.map((item, fileIndex) => {
        return (
          <EmailDocumentsItem
            key={`${item.name}${fileIndex}`}
            item={item}
            handleDelete={() => handleDelete(item)}
          />
        );
      })}
    </div>
  );
};
