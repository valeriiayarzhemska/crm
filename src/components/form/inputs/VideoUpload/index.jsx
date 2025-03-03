import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Upload } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import {
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetVideosForRealtyQuery,
} from '../../../../redux/services/videos/videosApi';

import { InputsTemplate } from '../InputsTemplate';
import { VideoItem } from '../../../ui/VideoItem';
import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import { LoaderProgress } from '../../../ui/LoaderProgress';
import { Loader } from '../../../ui/Loader';
import { Dialog } from '../../../ui/Dialog';
import { DialogConfirm } from '../../../ui/DialogConfirm';

import { showError } from '../../../../utils/ui';
import { transformVideoData } from '../../../../utils/data';
import { generateId } from '../../../../utils/utils';
import { errorMessages } from '../../../../data/constants';

export const VideoUpload = ({
  realtyId,
  formProps = {},
  inputsList = [],
}) => {
  const inputRef = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);

  const [sourcesFromBack, setSourcesFromBack] = useState([]);
  const [sources, setSources] = useState([]);

  const name = inputsList[0]?.name;

  const userToken = useSelector(selectUserToken);
  const {
    data: videos,
    isLoading: isVideoLoading,
    error: videoError,
  } = useGetVideosForRealtyQuery(
    { token: userToken, realty_id: realtyId },
    { skip: !realtyId }
  );
  const [addVideos, { isLoading: isAddingLoading, error: addingError }] =
    useAddVideoMutation();
  const [deleteVideo, { isLoading: isDeletingLoading, error: deletingError }] =
    useDeleteVideoMutation();

  const handleSave = async () => {
    if (sources.length < 1) {
      setIsEdit(false);

      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = transformVideoData(sources);

    const response = await addVideos({
      data: formData,
      token: userToken,
      realty_id: realtyId,
    });

    if (response?.error) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  const handleFileChange = async event => {
    setIsEdit(true);

    const filesArray = Array.from(event.target.files);
    const newFilesArray = filesArray.map(file => {
      const url = URL.createObjectURL(file);

      return { file: file, fileUrl: url, id: generateId() };
    });
    let updatedFiles = [];

    setSources(prevFiles => {
      const existingFileNamesFromBack = new Set(
        sourcesFromBack.map(file => file.name)
      );
      const existingFileNames = new Set(prevFiles.map(file => file.file.name));
      const allExistingFileNames = new Set([
        ...existingFileNames,
        ...existingFileNamesFromBack,
      ]);

      const newFiles = newFilesArray.filter(
        file => !allExistingFileNames.has(file.file.name)
      );

      updatedFiles = [...prevFiles, ...newFiles];

      return updatedFiles;
    });

    if (formProps && formProps?.setFieldValue) {
      await formProps.setFieldValue('videos', newFilesArray); // to triger submit button
    }
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  const handleRemove = id => {
    let newSources = [];

    setSources(prevFiles => {
      newSources = prevFiles.filter(prevFile => prevFile.id !== id);

      return newSources;
    });

    if (formProps?.setFieldValue) {
      formProps.setFieldValue(name, newSources);
    }
  };

  const openConfirmDelete = id => {
    setIdToDelete(id);
    setIsDeleteClick(true);
  };

  const handleRemoveFileFromBack = async id => {
    setIsLoading(true);
    setError(null);

    const response = await deleteVideo({
      token: userToken,
      id,
    });

    if (response?.error || deletingError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsDeleteClick(false);
    }
  };

  useEffect(() => {
    showError(error);
  }, [error]);

  useEffect(() => {
    if (!isVideoLoading && videos) {
      setSourcesFromBack(videos?.video);
      setIsLoadingVideos(false);
    }

    if (videoError) {
      setError(errorMessages.videos);
      setIsLoadingVideos(false);
    }
  }, [videos, isVideoLoading]);

  return (
    <>
      {isLoading && <LoaderProgress />}

      <div className="VideoInput flex flex-col items-start gap-3 w-full">
        <div className="flex flex-col items-start gap-3 w-full sm:flex-row sm:items-center">
          <input
            ref={inputRef}
            className="VideoInput_input hidden"
            type="file"
            multiple
            onChange={handleFileChange}
            accept="video/*"
          />

          <button
            className="flex items-center gap-2 text-sm text-whiteColor py-2 px-3 bg-redColor rounded"
            onClick={handleChoose}
            type="button"
          >
            <Upload size={16} />
            Upload
          </button>

          <InputsTemplate
            inputsList={inputsList}
            formProps={formProps}
          />
        </div>

        {isLoadingVideos && (
          <div className="flex items-center justify-center py-6 w-full">
            <Loader
              width={30}
              height={30}
            />
          </div>
        )}

        <div
          className={cn('flex flex-col gap-3 w-full', {
            'p-3 border-2 border-dashed border-gray-200 bg-gray-100 rounded':
              isEdit,
          })}
        >
          {sources && sources.length > 0 && (
            <>
              {sources.map(source => {
                return (
                  <VideoItem
                    key={source.id}
                    id={source.id}
                    source={source.fileUrl}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </>
          )}

          {!isLoadingVideos &&
          sourcesFromBack &&
          sourcesFromBack.length > 0 && (
            <>
              {sourcesFromBack.map(source => {
                return (
                  <VideoItem
                    key={source.id}
                    id={source.id}
                    source={source.video}
                    handleRemove={openConfirmDelete}
                  />
                );
              })}
            </>
          )}

          {isEdit && (
            <div className="w-fit">
              <ButtonTemplate
                text={'Save'}
                handleClick={handleSave}
                classes={'bg-redColor border-redColor text-whiteColor'}
              />
            </div>
          )}
        </div>
      </div>

      {isDeleteClick && (
        <Dialog
          content={
            <DialogConfirm
              isLoading={isDeletingLoading}
              handleSubmit={() => handleRemoveFileFromBack(idToDelete)}
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
