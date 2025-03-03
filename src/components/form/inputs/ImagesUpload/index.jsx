import { useState } from 'react';
import ImageUploading from 'react-images-uploading';

import cn from 'classnames';
import heic2any from 'heic2any';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

import { BadgeSelect } from '../../BadgeSelect';
import { PhotoItem } from '../../../ui/PhotoItem';

import { colors, errorMessages } from '../../../../data/constants';
import { generateId } from '../../../../utils/utils';

export const ImagesUpload = ({
  formProps = {},
  images = {},
  setImages = () => {},
  imagesFromBack = {},
  setSelectedImages = () => {},
  setSelectedImagesFromBack = () => {},
  title = '',
  maxNumber = 30,
  classes = '',
  handleMovingImages = () => {},
  handleMovingImagesFromBack = () => {},
  titlesForBadge = [],
  setIsEdit = () => {},
  handleShowDeleteDialog = () => {},
}) => {
  const [hasCheckedImages, setHasCheckedImages] = useState(false);
  const hasClasses = classes && classes.length > 0 ? true : false;

  const onChange = async (imageList, addUpdateIndex) => {
    setIsEdit(true);

    const newImageList = [];

    for (const image of imageList) {
      const id = generateId();

      if (image.file && image.file.type === 'image/heic') {
        try {
          const convertedBlob = await heic2any({
            blob: image.file,
            toType: 'image/jpeg',
            quality: 0.4,
          });
          const convertedFile = new File(
            [convertedBlob],
            `${image.file.name}.jpg`,
            { type: 'image/jpeg' }
          );
          newImageList.push({
            ...image,
            file: convertedFile,
            data_url: URL.createObjectURL(convertedFile),
          });
        } catch (error) {
          console.error('Error converting HEIC image:', error);
          newImageList.push({ ...image, id: id });
        }
      } else {
        newImageList.push({ ...image, id: id });
      }
    }

    setImages(prevImages => {
      return { ...prevImages, [title]: [...newImageList] };
    });
  };

  const handleCheckClick = async (image, title, setState) => {
    await setState(prevImages => {
      const hasSelectedTitle = Object.prototype.hasOwnProperty.call(
        prevImages,
        title
      );
      const selectedTitleData = prevImages?.[title];
      let selectedDataToAdd;

      if (hasSelectedTitle) {
        const selectedImage = selectedTitleData.find(
          prevImage => prevImage['data_url'] === image['data_url']
        );

        if (!selectedImage) {
          selectedDataToAdd = {
            ...prevImages,
            [title]: [...selectedTitleData, image],
          };
        } else {
          const newData = selectedTitleData.filter(
            prevImage => prevImage['data_url'] !== image['data_url']
          );

          selectedDataToAdd = { ...prevImages, [title]: newData };
        }
      } else {
        selectedDataToAdd = { ...prevImages, [title]: [image] };
      }

      if (selectedDataToAdd?.[title]?.length > 0) {
        setHasCheckedImages(true);
      } else {
        setHasCheckedImages(false);
      }

      return selectedDataToAdd;
    });
  };

  const checkSameCategory = (titleToAdd, titleToDelete) => {
    if (titleToAdd === titleToDelete) {
      toast.error(errorMessages.sameCategory, {
        error: true,
        action: {},
      });

      return true;
    } else {
      return false;
    }
  };

  const handleTitleSelect = async props => {
    const isSameCategory = checkSameCategory(props.title, title);

    if (isSameCategory) {
      return;
    } else {
      await handleMovingImages({
        titleToAdd: props.title,
        titleToDelete: title,
      });

      await setSelectedImages(prevImages => {
        const newSelectedImages = prevImages;

        if (newSelectedImages?.[title]) {
          delete newSelectedImages[title];
        }

        return newSelectedImages;
      });

      setHasCheckedImages(false);
    }
  };

  const handleTitleSelectBackPhotos = async props => {
    const isSameCategory = checkSameCategory(props.title, title);

    if (isSameCategory) {
      return;
    } else {
      await handleMovingImagesFromBack({
        titleToAdd: props.title,
        titleToDelete: title,
      });

      await setSelectedImagesFromBack(prevImages => {
        const newSelectedImages = prevImages;

        if (newSelectedImages?.[title]) {
          delete newSelectedImages[title];
        }

        return newSelectedImages;
      });

      setHasCheckedImages(false);
    }
  };

  return (
    <>
      <div className="relative flex justify-between items-center w-full h-[26px]">
        <div className="">
          <span className="text-sm text-blackColor">{title}</span>
        </div>
      </div>

      <div className="flex flex-wrap p-2 w-full min-h-[160px]">
        <ImageUploading
          multiple
          value={images[title]}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={['jpg', 'png', 'JPG', 'JPEG', 'HEIC', 'heic']}
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
            <div className="upload__image-wrapper relative flex flex-wrap items-center gap-4 w-full">
              <button
                className={cn(
                  'absolute flex items-center justify-center gap-2 text-sm py-2 px-3 w-full h-full',
                  { 'text-blackColor': !imageList && imageList.length < 1 },
                  { 'text-whiteColor': imageList && imageList.length > 0 }
                )}
                style={isDragging ? { color: colors.redColor } : undefined}
                onClick={onImageUpload}
                type="button"
                {...dragProps}
              >
                <Upload size={16} />
                Upload or Drop
              </button>

              {imageList && imageList.length > 0 && (
                <>
                  {hasCheckedImages && (
                    <div className="absolute top-[-42px] right-0">
                      <BadgeSelect
                        item={{
                          title: 'Move to category',
                          color: 'text-whiteColor border-redColor bg-redColor',
                          selectData: titlesForBadge,
                          name: 'title',
                          handleBadgeSelect: handleTitleSelect,
                        }}
                      />
                    </div>
                  )}

                  {imageList.map((image, index) => {
                    return (
                      <PhotoItem
                        key={image.id}
                        hasClasses={hasClasses}
                        classes={classes}
                        image={image}
                        source={image['data_url']}
                        title={title}
                        index={index}
                        onImageRemove={onImageRemove}
                        onImageUpdate={onImageUpdate}
                        setSelectedImages={setSelectedImages}
                        handleCheckClick={handleCheckClick}
                        isNewImages={true}
                      />
                    );
                  })}
                </>
              )}

              {imagesFromBack?.[title] &&
              imagesFromBack?.[title]?.length > 0 && (
                <>
                  {hasCheckedImages && (
                    <div className="absolute top-[-42px] right-0">
                      <BadgeSelect
                        item={{
                          title: 'Move to category',
                          color:
                            'text-whiteColor border-redColor bg-redColor',
                          selectData: titlesForBadge,
                          name: 'title',
                          handleBadgeSelect: handleTitleSelectBackPhotos,
                        }}
                      />
                    </div>
                  )}

                  {imagesFromBack[title].map((image, index) => {
                    return (
                      <PhotoItem
                        key={image.id}
                        hasClasses={hasClasses}
                        classes={classes}
                        image={image}
                        source={image.image}
                        title={title}
                        index={index}
                        onImageRemove={handleShowDeleteDialog}
                        onImageUpdate={onImageUpdate}
                        setSelectedImages={setSelectedImagesFromBack}
                        handleCheckClick={handleCheckClick}
                      />
                    );
                  })}
                </>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    </>
  );
};
