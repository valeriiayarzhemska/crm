import { Upload } from 'lucide-react';

import { colors } from '../../../../../data/constants';

export const DocumentInput = ({ className = '', handleChange = () => {} }) => {
  return (
    <label
      className="relative flex items-center gap-1.5 bg-redColor rounded py-2 px-3 text-sm font-medium text-whiteColor cursor-pointer"
      htmlFor="upload-file"
    >
      <Upload
        size={16}
        color={colors.whiteColor}
      />
      Upload
      <input
        id="upload-file"
        type="file"
        multiple
        onChange={handleChange}
        accept=".pdf,.doc,.docx,.txt,.jpeg,.jpg,.png,.pptx"
        className={`absolute z-[-1] opacity-0 ${className}`}
      />
    </label>
  );
};
