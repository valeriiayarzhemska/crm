import { IconButtonTemplate } from '../IconButtonTemplate';

import { colors } from '../../../../data/constants';

export const FloatingButton = ({ handleClick = () => {}, icon = false }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[5]">
      <IconButtonTemplate
        handleClick={handleClick}
        icon={icon}
        color={colors.whiteColor}
        size={26}
        isRounded={true}
        bgColor={'border-pinkColor bg-pinkColor'}
      />
    </div>
  );
};
