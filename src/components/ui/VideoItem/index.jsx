import { Trash } from 'lucide-react';

import { IconButtonTemplate } from '../buttons/IconButtonTemplate';

export const VideoItem = ({ id, source, handleRemove = () => {} }) => {
  return (
    <div className="relative w-full">
      <video
        className="VideoInput_video"
        width={'100%'}
        height={300}
        controls
        src={source}
      >
        <track
          kind="captions"
          src={''}
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-2 right-2 flex flex-col gap-3">
        <IconButtonTemplate
          isSmall={true}
          icon={Trash}
          isRounded={true}
          handleClick={() => handleRemove(id)}
          classes={'bg-whiteColor opacity-80'}
        />
      </div>
    </div>
  );
};
