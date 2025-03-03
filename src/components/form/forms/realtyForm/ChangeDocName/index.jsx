import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  streetsData,
  streetsDataError,
  streetsDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';
import {
  useAddStreetNumberMutation,
  useDeleteStreetNumberMutation,
  useGetStreetNumberQuery,
  useUpdateStreetNumberMutation,
} from '../../../../../redux/services/data/streetsNumberApi';

import { FormTemplate } from '../../FormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { Loader } from '../../../../ui/Loader';
import { DeleteDialogButton } from '../../../DeleteDialogButton';

import {
  initialValues,
  mock,
  validationSchemaDocName,
} from '../../../../../lib/mocks/change-doc-name-mock';
import {
  addDataForDepedentSelects,
  getDefaultValueByValue,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../utils/data';
import { closeDialog, disableBodyScroll } from '../../../../../utils/ui';

import { useUpdateDocumentMutation } from '../../../../../redux/services/documents/documentsApi';
import { LoaderProgress } from '../../../../ui/LoaderProgress';

export const ChangeDocName = ({
  handleClose = () => {},
  handleSubmit = () => {},
  file = null,
  isEdit = false,
}) => {
  const handleSubmitForm = values => {
    if (handleSubmit) {
      handleSubmit({ file, values, handleClose, isEdit });
    }
  };

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      <FormTemplate
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchemaDocName)}
        handleSubmitForm={handleSubmitForm}
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
    </div>
  );
};
