export const ResultsTableItem = ({ title, value }) => {
  return (
    <tr className="flex items-center w-full bg-lightestGrayColor border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="w-40 pl-2 pr-6 text-sm text-blackColor">{title}</td>
      <td className="flex justify-center my-[0.4rem] py-[0.2rem] px-[0.2rem] text-sm text-blackColor bg-gray-200 rounded">
        {value}
      </td>
    </tr>
  );
};
