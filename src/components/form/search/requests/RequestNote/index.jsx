import { useState } from 'react';
import cn from 'classnames';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { InputTextarea } from '../../../inputs/InputTextarea';

import {
  clientTextarea,
  textareaClientDefaultValue,
} from '../../../../../data/clientData';

export const RequestNote = ({
  isClientsPage = false,
  isComment = true,
  handleSubmitEditing = () => {},
  agent_name,
  formatedDate,
  comment = '',
  note = '',
  color = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasNote = note && note.length > 0;

  return (
    <>
      {isComment && (
        <div className="text-xs text-blackColor italic">
          {comment && comment.length > 0 ? (
            <span>{comment}</span>
          ) : (
            <span>
              This is an automatically created deal. Press edit and fill in
              required parameters. And remove this &quot;comment&quot; as well
            </span>
          )}
        </div>
      )}

      <div
        className={cn('relative px-4', {
          'h-[80px] overflow-hidden': !isOpen,
        })}
      >
        <InputTextarea
          defaultValue={hasNote ? note : textareaClientDefaultValue}
          name={clientTextarea[0].name}
          fieldType={clientTextarea[0].fieldType}
          isWithoutButton={true}
          handleSubmit={handleSubmitEditing}
        />
      </div>

      <div
        className={cn(
          'px-1 w-full bottom-0 left-0 z-[3] md:px-2',
          { absolute: !isOpen },
          { static: isOpen }
        )}
      >
        <div
          className={cn(
            'w-full h-12 bg-gradient-to-t from-white to-transparent',
            { hidden: isOpen }
          )}
        ></div>
        <div
          className={cn(
            'flex items-center justify-center w-full cursor-pointer z-[3]',
            { 'h-9': !isOpen },
            { 'bg-gray-100': !color },
            { [color]: color },
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <>
            {isOpen ? <ChevronUp /> : <ChevronDown />}

            {isClientsPage && !isOpen && (
              <span className="absolute left-2 bottom-1 text-[10px] italic">
                Created {formatedDate} / {agent_name ? `(${agent_name})` : ''}
              </span>
            )}
          </>
        </div>
      </div>
    </>
  );
};
