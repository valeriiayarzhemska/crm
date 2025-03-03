import { useEffect, useRef } from 'react';
import cn from 'classnames';

import { Form, Formik } from 'formik';

import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';

import { LoaderProgress } from '../../../ui/LoaderProgress';

export const FormTemplate = ({
  initialValues,
  validationSchema,
  handleSubmitForm,
  buttonText = '',
  isLoadingData = false,
  isWithoutButton = false,
  buttonIcon = false,
  bgColor = false,
  classes = false,
  formClasses = false,
  children,
  setFormRef = () => {},
}) => {
  const formRef = useRef({});

  const hasClasses = classes && classes.length > 0;
  const hasFormClasses = formClasses && formClasses.length > 0;

  useEffect(() => {
    if (setFormRef && formRef) {
      setFormRef(formRef);
    }
  }, []);

  return (
    <div
      className={cn('flex flex-col flex-row flex-wrap gap-3 w-full', {
        [classes]: hasClasses,
      })}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
        innerRef={formRef}
        validateOnBlur={true}
      >
        {formProps => (
          <>
            {formProps.isSubmitting && <LoaderProgress />}

            <Form
              className={cn(
                'flex flex-col',
                {
                  'gap-4': !hasFormClasses,
                },
                {
                  [formClasses]: hasFormClasses,
                }
              )}
            >
              {children(formProps)}

              {!isWithoutButton && (
                <div>
                  <ButtonTemplate
                    text={buttonText}
                    bgColor={bgColor}
                    //handleClick={() => handleSubmitForm(formProps.values)}
                    isLoadingData={formProps.isSubmitting}
                    icon={buttonIcon}
                    disabled={
                      !formProps.dirty ||
                      Object.keys(formProps.errors).length > 0 ||
                      formProps.isSubmitting
                    }
                    type="submit"
                  />
                </div>
              )}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
