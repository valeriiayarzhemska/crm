import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useAddRealtyLikeMutation } from '../../../../redux/services/realties/realtiesApi';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';

import { SearchItemRequests } from '../../../form/search/requests/SearchItemRequests';
import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';

import { errorMessages, matchingValues } from '../../../../data/constants';
import { handleLikeChange, loadLikeData, showError } from '../../../../utils/ui';

export const MatchingItemRequest = ({ request = {}, realtyId, item = {} }) => {
  const [likeStatus, setLikeStatus] = useState(matchingValues[0]);

  const userToken = useSelector(selectUserToken);
  const [addLike, { isLoading: isAddingLoading, error: addingError }] =
    useAddRealtyLikeMutation();

  const handleLikeClick = async () => {
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
  };

  useEffect(() => {
    loadLikeData(request?.likes, realtyId, setLikeStatus);
  }, []);

  return (
    <div className="flex gap-2 w-full">
      <div className="w-16">
        <IconButtonTemplate
          handleClick={handleLikeClick}
          icon={likeStatus.icon}
          color={likeStatus.color}
        />
      </div>

      <SearchItemRequests
        client={item}
        isMatching={true}
        request={request}
      />
    </div>
  );
};
