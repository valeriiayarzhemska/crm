import { useState } from 'react';

import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';

import { successMessages, variablesEmail } from '../../../../../data/constants';
import { handleCopy } from '../../../../../utils/utils';

export const EmailVariables = () => {
  const [isVariablesShown, setIsVariablesShown] = useState(false);

  const handleVariableClick = value => {
    handleCopy(value, successMessages.copyVariable);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <ButtonTemplate
        text={'Show available variables'}
        handleClick={() => setIsVariablesShown(!isVariablesShown)}
      />

      {isVariablesShown && (
        <div className="flex flex-wrap items-center gap-2">
          {variablesEmail.map(button => {
            return (
              <ButtonTemplate
                key={button.id}
                text={button.text}
                isSmallText={true}
                handleClick={() => handleVariableClick(button.value)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
