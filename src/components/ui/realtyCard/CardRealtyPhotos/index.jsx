import { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import cn from 'classnames';

import { SwiperImages } from '../../SwiperImages';

import { colors } from '../../../../data/constants';

export const CardRealtyPhotos = ({ realtyId, photos, isPwa = false }) => {
  const [newPhotos, setNewPhotos] = useState([]);

  const handlePhotos = () => {
    if (photos) {
      let updatedPhotos = [];

      for (const [key, value] of Object.entries(photos)) {
        if (value && value?.length > 0) {
          updatedPhotos = [...updatedPhotos, ...value];
        }
      }

      setNewPhotos(updatedPhotos);
    }
  };

  useEffect(() => {
    handlePhotos();
  }, []);

  return (
    <>
      {newPhotos && newPhotos.length > 0 ? (
        <SwiperImages realtyId={realtyId}>
          {newPhotos.map(newPhoto => {
            return (
              <div
                key={newPhoto.id}
                className={cn('w-full h-[240px]', { 'xs:w-[360px]': !isPwa })}
              >
                <img
                  src={newPhoto.image}
                  alt="object img"
                  className="block w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </SwiperImages>
      ) : (
        <div className="flex justify-center items-center w-full h-full bg-gray-100">
          <Camera
            size={44}
            color={colors.grayColor}
          />
        </div>
      )}
    </>
  );
};
