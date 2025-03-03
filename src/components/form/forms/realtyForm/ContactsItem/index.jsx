import { useState } from 'react';
import { X } from 'lucide-react';

export const ContactsItem = ({
  contact = {},
  handleContactItemClick = () => {},
  handleDelete = () => {},
}) => {
  const { first_name, last_name, role, id } = contact;

  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [contactRole, setContactRole] = useState(role);

  return (
    <div className="flex items-center gap-2 py-1 px-2 h-[40px] bg-gray-200 rounded">
      <div
        className="flex flex-col"
        onClick={() =>
          handleContactItemClick({
            firstName,
            setFirstName,
            lastName,
            setLastName,
            contactRole,
            setContactRole,
            id,
          })
        }
      >
        <span className="text-xs font-medium text-blackColor">
          {`${firstName ? `${firstName} ` : ''}${lastName || ''}`}
        </span>

        {contactRole?.title && (
          <span className="text-[10px] text-gray-600">{contactRole.title}</span>
        )}
      </div>

      <div
        className="pl-1.5 pr-0.5"
        onClick={() => handleDelete(id)}
      >
        <X size={14} />
      </div>
    </div>
  );
};
