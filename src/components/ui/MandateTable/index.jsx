import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useGetMandatesQuery } from '../../../redux/services/mandate/mandateApi';
import {
  setSearchLoading,
  showSearch,
} from '../../../redux/features/dashboard/dashboardSlice';
import { selectUserToken } from '../../../redux/features/user/userSelectors';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shadcn/table';
import { Loader } from '../Loader';
import { showError } from '../../../utils/ui';
import { errorMessages } from '../../../data/constants';

export const MandateTable = ({ handleAddExistedMandate = () => {} }) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector(selectUserToken);
  const {
    data: mandates = [],
    isFetching: isMandatesLoading,
    error: mandatesError,
  } = useGetMandatesQuery(userToken);

  const handleRealtyClick = async realtyId => {
    await navigate('/');

    await dispatch(setSearchLoading(true));

    await dispatch(
      showSearch({
        isSearchVisible: true,
        searchQuery: realtyId,
        searchFilters: '',
        searchPage: null,
      })
    );

    await dispatch(setSearchLoading(false));
  };

  useEffect(() => {
    if (mandates && !isMandatesLoading) {
      setIsLoading(false);

      if (mandatesError) {
        showError(errorMessages.mandates);
      }
    }
  }, [mandates, isMandatesLoading]);

  return (
    <>
      {!isLoading && mandates && mandates?.length > 0 && (
        <Table className="mt-4">
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Number</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead>End date</TableHead>
                <TableHead>Related listings</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mandates.map(mandate => {
                const {
                  id,
                  agency,
                  mandate_end_date,
                  mandate_start_date,
                  mandate_type,
                  related,
                } = mandate;

                return (
                  <TableRow key={id}>
                    <TableCell>{`№${id}`}</TableCell>
                    <TableCell>{agency}</TableCell>
                    <TableCell>
                      {mandate_type?.title ? mandate_type.title : ''}
                    </TableCell>
                    <TableCell>{mandate_start_date}</TableCell>
                    <TableCell>{mandate_end_date}</TableCell>
                    <TableCell>
                      <span
                        onClick={() => handleRealtyClick(id)}
                        className="block underline text-darkBlueColor cursor-pointer"
                      >
                        {`${related?.realty_id} (Open search)`}
                      </span>

                      {related?.realty_type?.title && (
                        <span className="block">
                          {related.realty_type.title}
                        </span>
                      )}

                      {related?.living_size && (
                        <span className="block">
                          Living size: {related.living_size}
                        </span>
                      )}

                      {related?.bedrooms && (
                        <span className="block">
                          Bedrooms: {related.bedrooms}
                        </span>
                      )}

                      <span
                        onClick={() => handleAddExistedMandate(id)}
                        className="block underline text-darkBlueColor cursor-pointer"
                      >
                        Add this mandate
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        </Table>
      )}

      {isLoading && (
        <div className="flex justify-center items-center w-[90%] sm:w-52 h-52">
          <Loader />
        </div>
      )}

      {!isLoading && mandates && mandates?.length === 0 && (
        <div className="flex justify-center items-center w-[90%] sm:w-52 h-52">
          <span className="text-sm text-redColor font-medium">No mandates</span>
        </div>
      )}
    </>
  );
};
