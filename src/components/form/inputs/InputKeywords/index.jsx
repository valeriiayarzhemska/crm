import { useEffect, useState } from 'react';

import { WithContext as ReactTags } from 'react-tag-input';
import { ToggleGroupTemplate } from '../ToggleGroupTemplate';
import { toggleAndOrList } from '../../../../data/constants';

export const InputKeywords = ({
  formProps,
  label,
  defaultClasses,
  name,
  placeholder,
  isResetClicked,
  setIsResetClicked,
}) => {
  const [tags, setTags] = useState([]);
  const [isLabelShown, setIsLabelShown] = useState(
    formProps.values[name] && formProps.values[name].length > 0
  );

  const Label = label;

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  useEffect(() => {
    if (!tags.length) {
      setIsLabelShown(false);
    } else {
      setIsLabelShown(true);
    }
  }, [tags]);

  useEffect(() => {
    if (isResetClicked) {
      setIsLabelShown(false);
      setIsResetClicked(false);
    }
  }, [isResetClicked]);

  return (
    <>
      {label && (
        <Label
          name={name}
          placeholder={placeholder}
          isLabelShown={isLabelShown}
        />
      )}

      <ReactTags
        tags={tags}
        delimiters={[188, 13]}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="bottom"
        autocomplete
        className={defaultClasses}
      />

      <div className="absolute top-[-6px] right-1">
        <ToggleGroupTemplate
          formProps={formProps}
          toggleType={'single'}
          defaultValue={toggleAndOrList[0]}
          toggleList={toggleAndOrList}
          isDefault={true}
        />
      </div>
    </>
  );
};
