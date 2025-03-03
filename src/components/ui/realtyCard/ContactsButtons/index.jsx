import { useEffect, useState } from 'react';
import {
  realtyButtonsTitles,
  realtyContactsButtons,
} from '../../../../data/cardRealty';
import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { ButtonsList } from '../../ButtonsList';
import { VisitsBar } from '../../VisitsBar';
import {
  agentsDataWithUser,
  agentsDataWithUserError,
} from '../../../../redux/features/dashboard/dashboardSelectors';
import { toast } from 'sonner';
import { errorMessages } from '../../../../data/constants';
import { UsersRound } from 'lucide-react';
import { useSelector } from 'react-redux';
import { showError, transformAssistantsDataInputs } from '../../../../utils/ui';
import { ButtonTemplate } from '../../buttons/ButtonTemplate';
import { Dialog } from '../../Dialog';
import { AddAssignee } from '../../../form/forms/realtyForm/AddAssignee';
import { selectUserInfo } from '../../../../redux/features/user/userSelectors';

export const ContactsButtons = ({
  agencyId,
  agent = {},
  realtyId,
  ttc = '',
}) => {
  const [showAllAssignees, setShowAllAssignees] = useState(false);
  const [showCollaborationForm, setShowCollaborationForm] = useState(false);
  const [showVisitsBar, setShowVisitsBar] = useState(false);
  const [assignedTo, setAssignedTo] = useState(agent?.name);

  const [assignees, setAssignees] = useState([]);

  const userInfo = useSelector(selectUserInfo);
  const agents = useSelector(agentsDataWithUser);
  const agentsError = useSelector(agentsDataWithUserError);

  const handleWhatsUpClick = () => {
    console.log('whatsup');
  };

  const handleAssignedToClick = () => {
    if (Number(userInfo?.agency_id) === Number(agencyId)) {
      setShowAllAssignees(!showAllAssignees);
    }
  };

  const handleAssigneesClick = assignee => {
    setAssignedTo(assignee?.title || '');

    // add logic with request to change agent in realty form

    setShowAllAssignees(false);
  };

  const handleTaskVisitsClick = () => {
    setShowVisitsBar(!showVisitsBar);
  };

  const handleCollaborationClick = () => {
    setShowCollaborationForm(true);
  };

  const buttonsHandlers = {
    [realtyButtonsTitles.whatsUp]: handleWhatsUpClick,
    [realtyButtonsTitles.assignedTo]: handleAssignedToClick,
    [realtyButtonsTitles.tasksVisits]: handleTaskVisitsClick,
  };

  const addAgents = async () => {
    if (agents && agents?.length > 0) {
      const updatedAssistants = await transformAssistantsDataInputs(agents);

      setAssignees(updatedAssistants);
    }

    showError(agentsError, errorMessages.agents);
  };

  useEffect(() => {
    addAgents();
  }, [agents]);

  return (
    <div className="absolute flex flex-col items-end gap-1 right-0 bottom-1.5 z-[1]">
      {ttc && (
        <div className="flex items-center gap-1 w-max px-1 bg-white rounded-l opacity-80">
          <span className="text-xs text-blackColor">&#8364; {`${ttc}`} TTC</span>
        </div>
      )}

      <div className="flex items-center gap-1 px-1 bg-white rounded-l opacity-80">
        {realtyContactsButtons.map(button => {
          const handleClick = buttonsHandlers[button.title];

          return button?.hasText ? (
            <ButtonTemplate
              key={button.id}
              handleClick={() => handleClick(button)}
              text={assignedTo}
              classes={button.classes}
              isSmall={true}
              isSmallBorder={true}
              size={14}
              tooltipText={button.tooltipText}
            />
          ) : (
            <IconButtonTemplate
              key={button.id}
              handleClick={() => handleClick(button)}
              icon={button.icon}
              classes={button.classes}
              isSmallBorder={true}
              size={14}
              tooltipText={button.tooltipText}
            />
          );
        })}
      </div>

      {showAllAssignees && assignees.length > 0 && (
        <ButtonsList
          list={assignees}
          additionalButton={{
            title: 'Collaboration',
            icon: UsersRound,
            handleClick: handleCollaborationClick,
          }}
          handleButtonClick={handleAssigneesClick}
          setIsOpen={setShowAllAssignees}
          classes="bottom-7 right-0"
        />
      )}

      {showVisitsBar && (
        <VisitsBar
          setIsOpen={setShowVisitsBar}
          classes="bottom-7 right-0"
          realtyId={realtyId}
        />
      )}

      {showCollaborationForm && (
        <Dialog
          content={
            <AddAssignee
              assignees={assignees}
              agentId={agent?.id}
              realtyId={realtyId}
              handleClose={() => setShowCollaborationForm(false)}
            />
          }
          isOpen={showCollaborationForm}
          onClose={() => setShowCollaborationForm(false)}
        />
      )}
    </div>
  );
};
