import { useState } from 'react';
import cn from 'classnames';

import ImageUploading from 'react-images-uploading';
import { colors } from '../../../../data/constants';
import { ArrowRightLeft, Trash2, Upload } from 'lucide-react';
import { IconButtonTemplate } from '../../../ui/buttons/IconButtonTemplate';

export const ImageUpload = ({
  formProps = {},
  name = '',
  maxNumber = 1,
  classes = '',
}) => {
  const [images, setImages] = useState([]);

  const hasClasses = classes && classes.length > 0 ? true : false;

  const onChange = async (imageList, addUpdateIndex) => {
    if (formProps?.setFieldValue) {
      await formProps.setFieldValue(name, imageList[0]?.['file']);
    }

    setImages(imageList);
  };

  const handleRemove = (onImageRemove, index) => {
    onImageRemove(index);

    if (formProps?.setFieldValue) {
      formProps.setFieldValue(name, '');
    }
  };

  return (
    <div className="w-full">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        acceptType={['jpg', 'png']}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper flex flex-col items-start gap-4 w-full">
            <button
              className="flex items-center gap-2 text-sm text-whiteColor py-2 px-3 bg-redColor rounded"
              style={isDragging ? { color: colors.redColor } : undefined}
              onClick={onImageUpload}
              type="button"
              {...dragProps}
            >
              <Upload size={16} />
              Upload or Drop
            </button>

            {imageList.map((image, index) => (
              <div
                key={index}
                className={cn('image-item flex flex-col gap-3 w-full')}
              >
                <div
                  key={index}
                  className={cn(
                    'relative image-item flex',
                    {
                      [classes]: hasClasses,
                    },
                    {
                      'w-[30%] h-24 sm:h-60': !hasClasses,
                    }
                  )}
                >
                  <img
                    src={image['data_url']}
                    alt=""
                    className="block w-full h-full object-cover object-center"
                  />

                  <div className="absolute flex items-center gap-2 top-1 right-1">
                    <IconButtonTemplate
                      isSmall={true}
                      icon={ArrowRightLeft}
                      isRounded={true}
                      bgColor={'bg-whiteColor'}
                      classes={'opacity-70 hover:opacity-90'}
                      handleClick={() => onImageUpdate(index)}
                    />

                    <IconButtonTemplate
                      isSmall={true}
                      icon={Trash2}
                      isRounded={true}
                      bgColor={'bg-whiteColor'}
                      classes={'opacity-70 hover:opacity-90'}
                      handleClick={() => handleRemove(onImageRemove, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
