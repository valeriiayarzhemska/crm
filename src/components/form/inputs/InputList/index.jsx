import { useState } from 'react';

import { InputsTemplate } from '../InputsTemplate';

export const InputList = ({ formProps, inputs = [] }) => {
  const [inputsTitle, setInputsTitle] = useState(() => {
    const inputWithTitle = inputs.find(input => input.inputsTitle);

    return inputWithTitle ? inputWithTitle.inputsTitle : '';
  });

  return (
    <>
      {inputsTitle && (
        <div className="mt-4 w-full">
          <span className="text-sm color-blackColor">{inputsTitle}</span>
        </div>
      )}

      <div className="flex items-center flex-wrap gap-4 w-full md:gap-5">
        <InputsTemplate
          formProps={formProps}
          inputsList={inputs}
        />
      </div>
    </>
  );
};
