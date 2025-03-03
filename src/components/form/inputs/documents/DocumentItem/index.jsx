import { Checkbox } from '../../../../ui/shadcn/checkbox';
import { DocumentsButtons } from '../../../documents/DocumentsButtons';

import {
  bytesToMegabytes,
  formatDateToString,
} from '../../../../../utils/utils';

export const DocumentItem = ({
  id,
  item = {},
  title,
  buttons = [],
  isActiveButton = false,
  isDisabled = false,
  isEdit = false,
  handleCheckClick = () => {},
  buttonsHandlersProps = {},
  setState = () => {},
}) => {
  const { name, size, lastModifiedDate } = item;

  const newName = name?.length > 20 ? `${name.slice(0, 20)}...` : name;
  const newSize = bytesToMegabytes(size);
  const date = lastModifiedDate ? lastModifiedDate : new Date();
  const newDate = typeof date === 'string' ? date : formatDateToString(date);

  return (
    <div className="flex flex-col just gap-4 p-4 bg-gray-100 rounded sm:w-[390px]">
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <span className="text-sm text-blue-900 font-medium underline cursor-pointer">
          {newName}
        </span>

        <span className="text-sm text-blackColor">{`(${newSize} MB, ${newDate})`}</span>
      </div>

      <div className="relative flex items-center gap-4 h-full w-full">
        {title && (
          <div
            className="flex items-center bg-whiteColor rounded"
            onClick={() => handleCheckClick({ file: item, id }, title, setState)}
          >
            <Checkbox id={id} />
          </div>
        )}

        <DocumentsButtons
          buttons={buttons}
          isDisabled={isActiveButton || isDisabled}
          buttonsHandlersProps={buttonsHandlersProps}
          propsForHandle={{ id, item, title, isEdit, isActiveButton }}
        />
      </div>
    </div>
  );
};
