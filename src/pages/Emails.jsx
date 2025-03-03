import { Container } from '../layouts/Container';
import { EmailForm } from '../components/form/forms/emailForms/EmailForm';
import { SearchListClients } from '../components/form/search/clients/SearchListClients';

import { emailsValuesTitles, mock } from '../lib/mocks/email-mock';

export const mockClientId = [
  {
    id: 1,
    placeholder: 'Client',
    fieldType: 'search',
    name: emailsValuesTitles.client_id,
    classNames: 'w-full sm:w-2/4',
    searchComponent: SearchListClients,
  },
];

export const Emails = () => {
  return (
    <Container>
      <div className="flex flex-col gap-4 w-full">
        <div>
          <h2 className="text-lg font-bold color-blackColor">Recepients</h2>
        </div>

        <EmailForm inputs={[...mockClientId, ...mock]} />
      </div>
    </Container>
  );
};
