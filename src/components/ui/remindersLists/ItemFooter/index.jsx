export const ItemFooter = ({ agent, subject = '', created }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex p-2 w-full min-h-8 max-h-32 bg-gray-200 rounded overflow-y-auto hide-scroll">
        {subject && subject?.length > 0 ? (
          <span className="block text-xs text-blackColor">{subject}</span>
        ) : (
          <span className="block text-xs italic text-blackColor">
            No subject
          </span>
        )}
      </div>

      <div className="flex gap-2 w-full">
        <span className="block text-[10px] text-gray-800 italic">Agent: {agent}</span>

        <span className="block text-[10px] text-gray-500 italic">Created {created}</span>
      </div>
    </div>
  );
};
