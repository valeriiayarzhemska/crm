export const InputLabel = ({ isLabelShown, name, placeholder }) => {
  return (
    <>
      {isLabelShown && (
        <label
          htmlFor={name}
          className="absolute top-[-0.6rem] text-[10px] text-gray-400"
        >
          {placeholder}
        </label>
      )}
    </>
  );
};
