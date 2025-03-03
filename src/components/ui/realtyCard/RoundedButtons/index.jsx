import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, ThumbsUp } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectSearchRequestInfo } from '../../../../redux/features/dashboard/dashboardSelectors';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import { useAddRealtyLikeMutation } from '../../../../redux/services/realties/realtiesApi';

import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { Dialog } from '../../Dialog';
import { MatchingComponent } from '../../matchingComponents/MatchingComponent';

import { errorMessages, matchingValues } from '../../../../data/constants';
import {
  handleLikeChange,
  loadLikeData,
  showError,
} from '../../../../utils/ui';

export const RoundedButtons = ({ realtyId, likes }) => {
  const navigate = useNavigate();
  const request = useSelector(selectSearchRequestInfo);
  const userToken = useSelector(selectUserToken);
  const [addLike, { isLoading: isAddingLoading, error: addingError }] =
    useAddRealtyLikeMutation();

  const [isMatchingClick, setIsMatchingClick] = useState(false);
  const [likeStatus, setLikeStatus] = useState(matchingValues[0]);

  const handleMailClick = () => {
    navigate('/emails');
  };

  const handleMatchingClick = async () => {
    if (request) {
      const likeType = handleLikeChange(likeStatus, setLikeStatus);
      const response = await addLike({
        token: userToken,
        data: {
          realty_id: realtyId,
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
    if (likes && request) {
      loadLikeData(likes, request.id, setLikeStatus);
    }
  }, [likes?.like?.length, likes?.dislike?.length]);

  return (
    <div className="absolute flex flex-col gap-1 right-1.5 top-1.5 z-[1]">
      <IconButtonTemplate
        bgColor="border-whiteColor bg-whiteColor"
        handleClick={handleMailClick}
        icon={Mail}
        size={18}
        isRounded={true}
        classes="opacity-70 hover:opacity-90"
      />

      <IconButtonTemplate
        bgColor="border-whiteColor bg-whiteColor"
        handleClick={handleMatchingClick}
        icon={request ? likeStatus.icon : ThumbsUp}
        color={request ? likeStatus.color : ''}
        size={18}
        isRounded={true}
        classes="opacity-70 hover:opacity-90"
      />

      {isMatchingClick && (
        <Dialog
          content={
            <MatchingComponent
              realtyId={realtyId}
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
