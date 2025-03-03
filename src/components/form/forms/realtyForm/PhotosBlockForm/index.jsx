import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  useAddPhotosMutation,
  useDeletePhotoMutation,
  useGetPhotosForRealtyQuery,
  useUpdatePhotosMutation,
} from '../../../../../redux/services/photos/photosApi';

import { ImagesUpload } from '../../../inputs/ImagesUpload';
import { Loader } from '../../../../ui/Loader';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { LoaderProgress } from '../../../../ui/LoaderProgress';
import { Dialog } from '../../../../ui/Dialog';
import { DialogConfirm } from '../../../../ui/DialogConfirm';

import {
  photosInputsTitles,
  titlesForPhotos,
} from '../../../../../lib/mocks/add-realty-mock';
import { generatePhotosBadges } from '../../../../../utils/utils';
import {
  handleMovingFiles,
  showError,
  transformTitles,
} from '../../../../../utils/ui';
import {
  generateImagesArrayToUpdate,
  generatePhotosFormData,
} from '../../../../../utils/data';
import { errorMessages } from '../../../../../data/constants';

export const PhotosBlockForm = ({
  realtyId,
  formProps = {},
}) => {
  const [images, setImages] = useState({});
  const [imagesFromBack, setImagesFromBack] = useState({});
  const [titles, setTitles] = useState(titlesForPhotos);
  const [selectDataTitles, setSelectDataTitles] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedImagesFromBack, setSelectedImagesFromBack] = useState({});
  const [selectedImagesToChange, setSelectedImagesToChange] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [error, setError] = useState(null);

  const memoTitles = useMemo(() => titles, [titles]);

  const userToken = useSelector(selectUserToken);
  const {
    data: photos,
    isFetching: isPhotoLoading,
    error: photoError,
  } = useGetPhotosForRealtyQuery(
    { token: userToken, realty_id: realtyId },
    { skip: !realtyId }
  );
  const [addPhotos, { isLoading: isAddingLoading, isError: addingError }] =
    useAddPhotosMutation();
  const [
    updatePhotos,
    { isLoading: isUpdatingLoading, isError: updatingError },
  ] = useUpdatePhotosMutation();
  const [
    deletePhoto,
    { isLoading: isDeletingLoading, isError: deletingError },
  ] = useDeletePhotoMutation();

  const handleDeleteImageFromBack = async () => {
    setError(null);

    const response = await deletePhoto({
      token: userToken,
      id: idToDelete,
    });

    if (response?.error) {
      setError(errorMessages.wentWrong);
    } else {
      setIsDeleteClick(false);
    }
  };

  const handleShowDeleteDialog = id => {
    setIsDeleteClick(true);
    setIdToDelete(id);
  };

  const createDataForBack = async (titleToAdd, titleToDelete, images) => {
    const imagesToUpdate = await generateImagesArrayToUpdate(
      titleToAdd,
      titleToDelete,
      images
    );

    await setSelectedImagesToChange(prevImages => {
      let newPrevImages = prevImages.filter(
        image => imagesToUpdate.findIndex(item => item.id === image.id) === -1
      );

      return [...newPrevImages, ...imagesToUpdate];
    });
  };

  const handleMovingImages = ({ titleToAdd, titleToDelete }) => {
    setIsEdit(true);

    handleMovingFiles({
      titleToAdd,
      titleToDelete,
      setState: setImages,
      selectedFiles: selectedImages,
      files: images,
      filterKey: 'data_url',
    });
  };

  const handleMovingImagesFromBack = ({ titleToAdd, titleToDelete }) => {
    setIsEdit(true);

    createDataForBack(titleToAdd, titleToDelete, selectedImagesFromBack);

    handleMovingFiles({
      titleToAdd,
      titleToDelete,
      setState: setImagesFromBack,
      selectedFiles: selectedImagesFromBack,
      files: imagesFromBack,
      filterKey: 'data_url',
    });
  };

  const handleSubmit = async () => {
    setError(null);
    setIsLoadingPhotos(true);

    let response;
    let hasImages = false;

    Object.values(images).forEach(value => {
      if (value && value.length > 0) {
        hasImages = true;
      }
    });

    if (selectedImagesToChange.length > 0) {
      const formData = hasImages
        ? generatePhotosFormData(images)
        : new FormData();

      formData.append(
        'data',
        JSON.stringify({ photos: selectedImagesToChange })
      );

      response = await updatePhotos({
        token: userToken,
        realty_id: realtyId,
        data: formData,
      });

      if (response?.error) {
        setError(errorMessages.wentWrong);
      } else {
        setIsEdit(false);
        setSelectedImagesToChange([]);
        setImages({});
      }
    } else if (hasImages) {
      const formData = generatePhotosFormData(images);

      response = await addPhotos({
        token: userToken,
        realty_id: realtyId,
        data: formData,
      });

      if (response?.error) {
        setError(errorMessages.wentWrong);
      } else {
        setIsEdit(false);
        setImages({});
      }
    } else {
      setIsEdit(false);
    }

    setIsLoadingPhotos(false);
  };

  useEffect(() => {
    transformTitles(titles, setSelectDataTitles);
  }, [titles]);

  useEffect(() => {
    if (photos?.photos && !isPhotoLoading) {
      const newPhotos = {};

      for (const [key, value] of Object.entries(photos.photos)) {
        newPhotos[key] = value.map(item => ({
          ...item,
          data_url: item.medium_image,
        }));
      }

      setImagesFromBack(newPhotos);
      setIsLoading(false);
    }

    if (photoError) {
      setError(errorMessages.photos);
      setIsLoading(false);
    }
  }, [photos, isPhotoLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  useEffect(() => {
    const newTitles = generatePhotosBadges(titles, formProps);

    setTitles(newTitles);
  }, [
    formProps?.values?.[photosInputsTitles.Living.inputTitle],
    formProps?.values?.[photosInputsTitles.Kitchen.inputTitle],
    formProps?.values?.[photosInputsTitles.Bathroom.inputTitle],
    formProps?.values?.[photosInputsTitles.Bedroom.inputTitle],
  ]);

  return (
    <>
      <div
        className={cn('flex flex-col gap-2 w-full', {
          'p-3 bg-gray-100 border-2 border-gray-200 border-dashed': isEdit,
        })}
      >
        {isLoadingPhotos && <LoaderProgress />}

        {isLoading && (
          <div className="flex justify-center items-center py-4 w-full">
            <Loader
              width={30}
              height={30}
            />
          </div>
        )}

        {!isLoading && (
          <>
            {memoTitles.map(title => {
              const titlesForBadge = selectDataTitles.filter(
                badgeTitle => badgeTitle !== title
              );

              return (
                <div
                  className="flex flex-col gap-2 p-2 w-full border-[1px] border-gray-200 shadow bg-white"
                  key={title}
                >
                  <ImagesUpload
                    formProps={formProps}
                    images={images}
                    setImages={setImages}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    setSelectedImagesFromBack={setSelectedImagesFromBack}
                    title={title}
                    handleMovingImages={handleMovingImages}
                    handleMovingImagesFromBack={handleMovingImagesFromBack}
                    titlesForBadge={titlesForBadge}
                    imagesFromBack={imagesFromBack}
                    setIsEdit={setIsEdit}
                    handleShowDeleteDialog={handleShowDeleteDialog}
                  />
                </div>
              );
            })}

            {isEdit && (
              <div className="flex items-start">
                <ButtonTemplate
                  text={'Save'}
                  handleClick={handleSubmit}
                  classes="bg-redColor border-redColor text-whiteColor"
                />
              </div>
            )}
          </>
        )}
      </div>

      {isDeleteClick && (
        <Dialog
          content={
            <DialogConfirm
              isLoading={isDeletingLoading}
              handleSubmit={() => handleDeleteImageFromBack(setIsDeleteClick)}
              handleCancel={() => setIsDeleteClick(false)}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isDeleteClick}
          onClose={() => setIsDeleteClick(false)}
        />
      )}
    </>
  );
};
