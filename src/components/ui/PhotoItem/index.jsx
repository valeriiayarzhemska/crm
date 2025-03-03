import { useState } from 'react';
import cn from 'classnames';
import { ArrowRightLeft, Trash2 } from 'lucide-react';

import { IconButtonTemplate } from '../buttons/IconButtonTemplate';
import { Checkbox } from '../shadcn/checkbox';
import { ButtonTemplate } from '../buttons/ButtonTemplate';

import { imagesDownloadButtons } from '../../../data/constants';

export const PhotoItem = ({
  title = '',
  image = {},
  classes = '',
  hasClasses = false,
  source = '',
  index,
  onImageRemove = () => {},
  onImageUpdate = () => {},
  handleCheckClick = () => {},
  setSelectedImages = () => {},
  isNewImages = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { small_image = '', medium_image = '' } = image;

  const imagesUrlSize = {
    320: small_image,
    768: medium_image,
    960: image?.image,
  };

  const downnloadImage = size => {
    window.open(imagesUrlSize[size]);
  };

  return (
    <div
      className={cn(
        'relative image-item flex',
        {
          [classes]: hasClasses,
        },
        {
          'w-[46%] h-36 sm:w-[30%]': !hasClasses,
        }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={source}
        alt=""
        className="block w-full h-full object-cover object-center"
      />

      <div
        className="absolute flex items-center gap-2 top-1 left-1 shadow"
        onClick={() => handleCheckClick(image, title, setSelectedImages)}
      >
        <Checkbox id={image?.id} />
      </div>

      <div className="absolute flex items-center gap-2 top-1 right-1">
        {isNewImages && (
          <IconButtonTemplate
            isSmall={true}
            icon={ArrowRightLeft}
            isRounded={true}
            bgColor={'bg-whiteColor'}
            classes={'opacity-70 hover:opacity-90'}
            handleClick={() => onImageUpdate(index)}
          />
        )}

        <IconButtonTemplate
          isSmall={true}
          icon={Trash2}
          isRounded={true}
          bgColor={'bg-whiteColor'}
          classes={'opacity-70 hover:opacity-90'}
          handleClick={() => onImageRemove(isNewImages ? index : image.id)}
        />
      </div>

      {!isNewImages && isHovered && (
        <div className="absolute flex items-center gap-2 bottom-1 left-1">
          {imagesDownloadButtons.map((button, index) => {
            return (
              <ButtonTemplate
                key={index}
                text={`${button}`}
                isSmall={true}
                isSmallBorder={true}
                classes={'border-white bg-whiteColor opacity-80 underline'}
                handleClick={() => downnloadImage(button)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
