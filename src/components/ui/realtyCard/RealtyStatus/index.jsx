import { useState } from 'react';

import { ButtonsList } from '../../ButtonsList';

import { realtyStatusMock } from '../../../../data/cardRealty';

export const RealtyStatus = ({
  updateRealtyData = () => {},
  realtyStatus = { value: 0 },
}) => {
  //const [availability, setAvailability] = useState({});
  const [buttonStatus, setButtonStatus] = useState(
    realtyStatusMock[Number(realtyStatus.value)]
  );
  const [showAllButtonStatuses, setShowAllButtonStatuses] = useState(false);

  /* const handleAvailabilityClick = () => {
    console.log('availibility');
  }; */

  /* const handleAvailability = () => {
    setAvailability({
      value: 'Available',
      description: '(26/02/2024)(user)',
      icon: RefreshCcw,
      handleClick: handleAvailabilityClick,
    });
  }; */

  const handleButtonStatusClick = () => {
    setShowAllButtonStatuses(!showAllButtonStatuses);
  };

  const handleButtonsStatusClick = async button => {
    const isSuccess = await updateRealtyData({ realty_status: button.value });

    if (isSuccess) {
      setButtonStatus(button);
    }

    setShowAllButtonStatuses(false);
  };

  /* useEffect(() => {
    handleAvailability();
  }, []); */

  return (
    <>
      <div
        onClick={handleButtonStatusClick}
        className="absolute top-[-3px] z-[1]"
      >
        <span
          className={`${buttonStatus.color} text-xs text-whiteColor p-1 rounded`}
        >
          {buttonStatus.title}
        </span>
      </div>

      {showAllButtonStatuses && (
        <ButtonsList
          list={realtyStatusMock}
          //additionalButton={availability}
          handleButtonClick={handleButtonsStatusClick}
          setIsOpen={setShowAllButtonStatuses}
          classes="top-5"
        />
      )}
    </>
  );
};
