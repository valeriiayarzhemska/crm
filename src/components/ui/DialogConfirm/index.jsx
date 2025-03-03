import { ButtonTemplate } from '../buttons/ButtonTemplate';

export const DialogConfirm = ({
  isLoading = false,
  handleSubmit = () => {},
  handleCancel = () => {},
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-6 pb-4">
      <div>
        <span className="text-lg font-medium text-blackColor">
          Are you sure?
        </span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <ButtonTemplate
          text={'Confirm'}
          handleClick={handleSubmit}
          isLoadingData={isLoading}
          disabled={isLoading}
        />

        <ButtonTemplate
          text={'Cancel'}
          handleClick={handleCancel}
          bgColor={'bg-redColor border-redColor'}
        />
      </div>
    </div>
  );
};
