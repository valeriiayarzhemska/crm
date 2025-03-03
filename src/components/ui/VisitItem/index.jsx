import { useEffect, useState } from 'react';

import cn from 'classnames';

export const VisitItem = ({ visit, handleClick = () => {} }) => {
  const [members, setMembers] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const { date, client_id, time, visit_members, visit_type  } = visit;

  const addMembers = visitMembers => {
    let newMembers = '';

    visitMembers.map(({ name }, index) => {
      if (index === 0) {
        newMembers = name;
      } else {
        newMembers += `, ${name}`;
      }
    });

    setMembers(newMembers);
  };

  useEffect(() => {
    addMembers(visit_members);
  }, [visit_members]);

  return (
    <div
      className="relative bg-gray-100 border-white p-0.5 w-full"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-xs text-blackColor">{`${members}: (${visit_type.title})`}</span>

      {isHovered && (
        <div
          className={cn(
            'absolute bottom-3/6 left-1/2 transform -translate-x-1/2 p-1 min-w-48 bg-gray-700 rounded-md text-xs text-white z-[4]'
          )}
        >
          {`Started at ${date} ${time ? time : ''}, ID: ${client_id}`}
        </div>
      )}
    </div>
  );
};
