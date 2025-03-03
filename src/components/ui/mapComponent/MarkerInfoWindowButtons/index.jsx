import { useEffect, useState } from 'react';
import { Heart, ThumbsUp } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavsRealties,
  selectSearchRequestInfo,
} from '../../../../redux/features/dashboard/dashboardSelectors';
import { setFavsRealties } from '../../../../redux/features/dashboard/dashboardSlice';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import { useAddRealtyLikeMutation } from '../../../../redux/services/realties/realtiesApi';

import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { Dialog } from '../../Dialog';
import { MatchingComponent } from '../../matchingComponents/MatchingComponent';

import {
  colors,
  errorMessages,
  matchingValues,
} from '../../../../data/constants';
import {
  handleLikeChange,
  loadLikeData,
  showError,
} from '../../../../utils/ui';

export const MarkerInfoWindowButtons = ({ realty = {} }) => {
  const { id, likes } = realty;

  const dispatch = useDispatch();
  const favsRealties = useSelector(selectFavsRealties);
  const request = useSelector(selectSearchRequestInfo);
  const userToken = useSelector(selectUserToken);
  const [addLike, { isLoading: isAddingLoading, error: addingError }] =
    useAddRealtyLikeMutation();

  const [isMatchingClick, setIsMatchingClick] = useState(false);
  const [isLikeActive, setIsLikeActive] = useState(
    favsRealties?.includes(Number(id))
  );
  const [likeStatus, setLikeStatus] = useState(matchingValues[0]);

  const handleLikeClick = async () => {
    const realtyId = Number(id);
    let newFavsRealties = [];

    if (!isLikeActive) {
      newFavsRealties = [...favsRealties, realtyId];
    } else {
      newFavsRealties = favsRealties.filter(
        favRealty => Number(favRealty) !== realtyId
      );
    }

    await dispatch(setFavsRealties(newFavsRealties));
  };

  const handleMatchingClick = async () => {
    if (request) {
      const likeType = handleLikeChange(likeStatus, setLikeStatus);
      const response = await addLike({
        token: userToken,
        data: {
          realty_id: id,
          client_request_id: request.id,
          like_type: likeType,
        },
      });
      const error = response?.error || addingError;

      if (error) {
        showError(errorMessages.wentWrong);
      }
    } else {
      setIsMatchingClick(!isMatchingClick);
    }
  };

  useEffect(() => {
    setIsLikeActive(favsRealties?.includes(Number(id)));
  }, [favsRealties.length]);

  useEffect(() => {
    if (request) {
      loadLikeData(likes, request?.id, setLikeStatus);
    }
  }, [request, likes]);

  return (
    <div className="flex gap-1.5 items-center">
      <IconButtonTemplate
        handleClick={handleMatchingClick}
        icon={request ? likeStatus.icon : ThumbsUp}
        color={request ? likeStatus.color : colors.blackColor}
        isSmall={true}
        size={14}
        isRounded={true}
      />

      <IconButtonTemplate
        handleClick={handleLikeClick}
        icon={Heart}
        isSmall={true}
        size={14}
        color={isLikeActive ? colors.redColor : colors.blackColor}
        isRounded={true}
      />

      {isMatchingClick && (
        <Dialog
          content={
            <MatchingComponent
              realtyId={id}
              handleCancel={() => setIsMatchingClick(false)}
            />
          }
          classes={'w-11/12 h-[500px] sm:w-[768px] sm:h-[700px]'}
          isOpen={isMatchingClick}
          onClose={() => setIsMatchingClick(false)}
        />
      )}
    </div>
  );
};
