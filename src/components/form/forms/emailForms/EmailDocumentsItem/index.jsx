import { Trash } from 'lucide-react';

import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';

export const EmailDocumentsItem = ({ item = {}, handleDelete = () => {} }) => {
  const { name } = item;
  const newName = name?.length > 20 ? `${name.slice(0, 20)}...` : name;

  return (
    <div className="flex items-start p-1.5 gap-2 bg-gray-100 rounded">
      <div>
        <span className="text-xs text-blackColor">{newName}</span>
      </div>

      <IconButtonTemplate
        isSmall={true}
        icon={Trash}
        isRounded={true}
        handleClick={handleDelete}
      />
    </div>
  );
};
