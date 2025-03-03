import { useEffect, useState } from 'react';

import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { Dialog } from '../../../../ui/Dialog';
import { ContactsItem } from '../ContactsItem';
import { AddContactForm } from '../AddContactForm';

import { contactsInputsNames } from '../../../../../data/constants';

export const ContactsList = ({ contactsList = [], formProps = {}, contacts = [] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [contactId, setContactId] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactInfo, setContactInfo] = useState({});

  const handleAddContactClick = () => {
    const selectedValue = formProps?.values?.[contactsInputsNames.contactInput];

    if (formProps?.setFieldValue && selectedValue) {
      const hasSelectedValue = selectedContacts.some(
        contact => contact.id === selectedValue
      );

      if (!hasSelectedValue) {
        const selectedContact = contacts.find(
          contact => contact.id === selectedValue
        );

        setSelectedContacts(prevValues => [...prevValues, selectedContact]);

        const selectedContactsId = [...selectedContacts, selectedContact].map(
          item => item.id
        );

        formProps.setFieldValue(
          contactsInputsNames.contacts,
          selectedContactsId
        );
      }
    }
  };

  const handleDelete = selectedValue => {
    const hasSelectedValue = selectedContacts.some(
      contact => contact.id === selectedValue
    );

    if (hasSelectedValue) {
      let newContactsValues = [];

      setSelectedContacts(prevValues => {
        const newValues = prevValues.filter(val => val.id !== selectedValue);
        newContactsValues = newValues;

        return newValues;
      });

      const selectedContactsId = newContactsValues.map(item => item.id);

      formProps.setFieldValue(contactsInputsNames.contacts, selectedContactsId);
    }
  };

  const handleContactItemClick = contactsInfo => {
    setContactId(contactsInfo.id);
    setContactInfo(contactsInfo);
    setIsEditOpen(true);
  };

  const updateSelectedContacts = () => {
    const dataContacts = contactsList;

    if (dataContacts && dataContacts?.length > 0) {
      setSelectedContacts(dataContacts);
    }
  };

  useEffect(() => {
    updateSelectedContacts();
  }, []);

  return (
    <>
      <ButtonTemplate
        text={'Add contact'}
        handleClick={handleAddContactClick}
      />

      {selectedContacts && selectedContacts.length > 0 && (
        <div className="flex flex-wrap gap-4 w-full">
          {selectedContacts.map((item, index) => {
            return (
              <ContactsItem
                contact={item}
                key={index}
                handleContactItemClick={handleContactItemClick}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      )}

      {isEditOpen && (
        <Dialog
          content={
            <AddContactForm
              formProps={formProps}
              contactInfo={contactInfo}
              isEdit={true}
              contactId={contactId}
              handleClose={() => setIsEditOpen(false)}
            />
          }
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};
