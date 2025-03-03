import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { FormTemplate } from '../../FormTemplate';

import {
  mock,
  initialValues,
} from '../../../../../lib/mocks/add-owner-comment';

export const AddOwnerComment = () => {
  const handleSubmit = () => {};

  return (
    <FormTemplate
      initialValues={initialValues}
      handleSubmitForm={handleSubmit}
      buttonText={'Save'}
      bgColor={'bg-purpleColor border-purpleColor'}
    >
      {formProps => (
        <InputsTemplate
          formProps={formProps}
          inputsList={mock}
        />
      )}
    </FormTemplate>
  );
};
