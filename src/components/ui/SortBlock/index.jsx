import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavsRealties,
  selectShowMap,
  selectTotalCount,
} from '../../../redux/features/dashboard/dashboardSelectors';
import {
  setFavsRealties,
  setShowMap,
} from '../../../redux/features/dashboard/dashboardSlice';
import { apiUrl } from '../../../redux/services/api';

import { ButtonTemplate } from '../buttons/ButtonTemplate';
import { mapButtonText } from '../../../data/constants';
import { links } from '../../../data/links';

export const SortBlock = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalCount);
  const favsRealties = useSelector(selectFavsRealties);
  const showMap = useSelector(selectShowMap);

  const [favsCounter, setFavsCounter] = useState('0');
  const [mapText, setMapText] = useState(mapButtonText.show);

  const handleDownloadPDF = () => {
    if (favsRealties && favsRealties.length > 0) {
      const downloadUrl = `${apiUrl}${links.realty}/pdf/${favsRealties.join(',')}`;

      window.open(downloadUrl);
    }
  };

  const handleDeleteFavs = () => {
    dispatch(setFavsRealties([]));
  };

  const handleMap = async () => {
    if (mapText === mapButtonText.show) {
      await dispatch(setShowMap(true));
    } else {
      await dispatch(setShowMap(false));
    }
  };

  useEffect(() => {
    setFavsCounter(`${favsRealties.length}`);
  }, [favsRealties?.length]);

  useEffect(() => {
    if (showMap) {
      setMapText(mapButtonText.hide);
    } else {
      setMapText(mapButtonText.show);
    }
  }, [showMap]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div>
        <span className="text-xs">{`${totalCount} of results`}</span>
      </div>

      <ButtonTemplate
        text={mapText}
        handleClick={handleMap}
      />

      <ButtonTemplate
        counter={favsCounter}
        icon={Heart}
        isIconText={true}
        text={'Download PDFs'}
        handleClick={handleDownloadPDF}
      />

      {favsCounter !== '0' ? (
        <ButtonTemplate
          text={'Delete all favs'}
          handleClick={handleDeleteFavs}
        />
      ) : null}
    </div>
  );
};
