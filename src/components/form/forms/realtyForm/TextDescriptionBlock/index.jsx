import { InputsTemplate } from '../../../inputs/InputsTemplate';

export const TextDescriptionBlock = ({ formProps = {}, inputsList = [] }) => {
  return (
    <>
      <InputsTemplate
        formProps={formProps}
        inputsList={inputsList}
      />
    </>
  );
};
