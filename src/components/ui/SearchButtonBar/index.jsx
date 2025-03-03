import { useState } from 'react';
import { Plus } from 'lucide-react';

import { IconButtonTemplate } from '../buttons/IconButtonTemplate';
import { Dialog } from '../Dialog';
import { AddClientForm } from '../../form/forms/AddClientForm';
import { AddRealtyForm } from '../../form/forms/realtyForm/AddRealtyForm';

export const SearchButtonBar = () => {
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [showAddAddRealtyForm, setShowAddAddRealtyForm] = useState(false);

  const handleAddClientClick = () => {
    setShowAddClientForm(!showAddClientForm);
  };

  const handleAddObjectClick = () => {
    setShowAddAddRealtyForm(!showAddAddRealtyForm);
  };

  return (
    <>
      <div className="absolute z-[2] flex flex-col justify-between pt-3 pb-0 px-0 gap-7 p-0 md:pb-1 md:px-1 md:gap-8">
        <IconButtonTemplate
          icon={Plus}
          isSmall={true}
          handleClick={handleAddObjectClick}
          tooltipText="Add listing"
          isMobileTooltip={true}
        />

        <IconButtonTemplate
          icon={Plus}
          isSmall={true}
          handleClick={handleAddClientClick}
          tooltipText="Add client"
          isMobileTooltip={true}
        />
      </div>

      {showAddClientForm && (
        <Dialog
          content={
            <AddClientForm handleClose={() => setShowAddClientForm(false)} />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={showAddClientForm}
          onClose={() => setShowAddClientForm(false)}
        />
      )}

      {showAddAddRealtyForm && (
        <Dialog
          content={
            <AddRealtyForm 
              handleClose={() => setShowAddAddRealtyForm(false)}
            />
          }
          classes={'w-full max-w-[768px]'}
          isOpen={showAddAddRealtyForm}
          onClose={() => setShowAddAddRealtyForm(false)}
        />
      )}
    </>
  );
};
