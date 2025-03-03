import { Form, Formik } from 'formik';

import { LoaderProgress } from '../../../../ui/LoaderProgress';

export const SearchFormTemplate = ({
  initialValues,
  validationSchema,
  handleSubmitForm,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={validationSchema}
    >
      {formProps => (
        <>
          {formProps.isSubmitting && <LoaderProgress />}

          <Form>{children(formProps)}</Form>
        </>
      )}
    </Formik>
  );
};
