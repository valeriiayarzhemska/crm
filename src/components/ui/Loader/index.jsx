import { RotatingLines } from 'react-loader-spinner';
import { colors } from '../../../data/constants';

export const Loader = ({
  width = 16,
  height = 16,
  color = colors.purpleColor,
}) => {
  return (
    <RotatingLines
      visible={true}
      height={height}
      width={width}
      color={color}
      strokeColor={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
