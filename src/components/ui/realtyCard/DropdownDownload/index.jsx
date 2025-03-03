import { useEffect, useRef } from 'react';
import { Camera, FileText, FileUp } from 'lucide-react';

import { apiUrl } from '../../../../redux/services/api';

import { links } from '../../../../data/links';
import { colors } from '../../../../data/constants';

export const DropdownDownload = ({ realtyId, setIsOpen = () => {} }) => {
  const ref = useRef(null);

  const handleDownloadPhotos = async () => {
    const downloadUrl = `${apiUrl}${links.photos}/${realtyId}/download`;

    window.open(downloadUrl);
  };

  const generateLink = lang => {
    const language = lang.toLowerCase();

    return `${apiUrl}${links.realty}/${realtyId}/pdf/${language}`;
  };

  const handleDownloadPoster = () => {
    const downloadUrl = `${apiUrl}${links.realty}/${realtyId}/poster`;

    window.open(downloadUrl);
  };

  const pdfsLangs = ['EN', 'FR', 'RU'];

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      onClick={e => e.stopPropagation()}
      className="absolute top-[-5px] left-1.5 flex flex-col gap-2 w-[118px] bg-whiteColor z-[2] shadow"
    >
      <div className="flex flex-col gap-1 items-center w-full">
        <div className="flex gap-0.5 justify-center items-center p-0.5 w-full bg-gray-400">
          <FileText
            color={colors.whiteColor}
            size={14}
          />

          <span className="block text-sm text-whiteColor">PDF</span>
        </div>

        {pdfsLangs.map(pdfsLang => {
          const link = generateLink(pdfsLang);

          return (
            <a
              key={pdfsLang}
              href={link}
              download={`document-${pdfsLang}.pdf`}
              className="p-0.5 w-full text-center cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-sm text-blackColor">{pdfsLang}</span>
            </a>
          );
        })}

        <div
          className="flex justify-center items-center gap-0.5 px-0.5 pt-0.5 pb-1.5 w-full text-center cursor-pointer"
          onClick={handleDownloadPoster}
        >
          <FileUp size={14} />

          <span className="block text-sm text-blackColor">Poster</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center w-full">
        <div className="flex gap-0.5 justify-center items-center p-0.5 w-full bg-gray-400">
          <Camera
            color={colors.whiteColor}
            size={14}
          />

          <span className="block text-sm text-whiteColor">Photos</span>
        </div>

        <div
          className="px-0.5 pt-0.5 pb-1.5 w-full text-center cursor-pointer"
          onClick={handleDownloadPhotos}
        >
          <span className="text-sm text-blackColor">Download</span>
        </div>
      </div>
    </div>
  );
};
