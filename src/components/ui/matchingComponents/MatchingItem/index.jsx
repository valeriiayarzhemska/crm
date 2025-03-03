import { MatchingItemRequest } from '../MatchingItemRequest';

export const MatchingItem = ({ realtyId, item = {} }) => {
  const { id, first_name, last_name, locale, requests } = item;
  const language = locale?.title
    ? `(${locale.title.slice(0, 2).toLowerCase()})`
    : '';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 py-1.5 w-full border-t-[1px] border-t-gray-200 border-b-[1px] border-b-gray-200">
        <div className="w-16">
          <span className="text-xs text-blackColor">{id}</span>
        </div>

        <div>
          <span className="text-xs font-bold text-blackColor">{`${first_name} ${last_name} ${language}`}</span>
        </div>
      </div>

      {requests && requests.length > 0 && (
        <>
          {requests.map((request, index) => {
            return (
              <MatchingItemRequest
                key={index}
                request={request}
                realtyId={realtyId}
                item={item}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
