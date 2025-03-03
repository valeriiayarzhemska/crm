import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import { useGetRealtyVisitsQuery } from '../../../redux/services/visits/visitsApi';

import { ButtonTemplate } from '../buttons/ButtonTemplate';
import { VisitItem } from '../VisitItem';
import { AddVisitForm } from '../../form/forms/AddVisitForm';
import { Dialog } from '../Dialog';
import { Loader } from '../Loader';
import { ErrorMsg } from '../ErrorMsg';
import { errorMessages } from '../../../data/constants';

export const VisitsBar = ({ realtyId, setIsOpen, classes }) => {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [content, setContent] = useState(null);

  const userToken = useSelector(selectUserToken);
  const {
    data: visitsData,
    isLoading: isVisitsLoading,
    error: visitsError,
  } = useGetRealtyVisitsQuery({ token: userToken, id: realtyId });

  const listRef = useRef(null);

  const hasClasses = classes && classes.length > 0;

  const handleClick = ({ dialogComponent, isEdit = false, visit }) => {
    const DialogContent = dialogComponent;

    if (isEdit) {
      setContent(
        <DialogContent
          setShowAddVisitForm={setIsDialogOpen}
          isEdit={isEdit}
          visit={visit}
          realtyId={realtyId}
        />
      );
    } else {
      setContent(
        <DialogContent
          setShowAddVisitForm={setIsDialogOpen}
          realtyId={realtyId}
        />
      );
    }

    setIsDialogOpen(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (document.querySelector('.dialog')) {
        return;
      }

      if (
        listRef.current &&
        !listRef.current.contains(event.target) &&
        !event.target.classList.contains('exclude-click')
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listRef, setIsOpen]);

  useEffect(() => {
    if (visitsData && visitsData.length > 0) {
      setError(null);
      setVisits(visitsData);
      setIsLoading(false);
    } else if (visitsData && visitsData.length === 0) {
      setError(null);
      setVisits([]);
      setIsLoading(false);
    }

    if (visitsError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [visitsData, visitsError]);

  return (
    <div
      ref={listRef}
      className={cn(
        'absolute flex flex-col gap-1 p-1 w-80 border-[1px] b-gray-200 bg-white shadow-md z-[3]',
        { [classes]: hasClasses }
      )}
    >
      {visits && visits.length > 0 && !isLoading && (
        <div className="flex flex-col gap-1 h-24 overflow-scroll hide-scroll">
          {visits.map((visit, index) => {
            return (
              <VisitItem
                visit={visit}
                key={index}
                handleClick={() =>
                  handleClick({
                    dialogComponent: AddVisitForm,
                    isEdit: true,
                    visit: visit,
                  })
                }
              />
            );
          })}
        </div>
      )}

      {isLoading && !error && (
        <div className="flex justify-center p-2 w-full">
          <Loader />
        </div>
      )}

      {!isLoading && error && <ErrorMsg message={error} />}

      <div className="flex w-full">
        {/* <ButtonTemplate
          text={'+Task'}
          handleClick={handleClick}
        /> */}

        <ButtonTemplate
          text={'+Visit'}
          handleClick={() => handleClick({ dialogComponent: AddVisitForm })}
        />

        {isDialogOpen && (
          <Dialog
            content={content}
            classes={'w-[90%] sm:w-[710px]'}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
