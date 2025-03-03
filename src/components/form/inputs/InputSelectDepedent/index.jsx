import { useSelector } from 'react-redux';

import { InputSelect } from '../InputSelect';

export const InputSelectDepedent = props => {
  const { selectDepedentData, selectDepedentDataLoading, defaultValue } = props;
  let propsSelect = props;

  if (
    typeof defaultValue === 'object' &&
    defaultValue !== null &&
    !Array.isArray(defaultValue)
  ) {
    const newDefaultValue = { ...defaultValue, title: defaultValue?.name };

    propsSelect = { ...props, defaultValue: [newDefaultValue] };
  }

  const selectDataRedux = useSelector(selectDepedentData);
  const isDataReduxLoading = useSelector(selectDepedentDataLoading);

  return (
    <InputSelect
      selectDataRedux={selectDataRedux}
      isDataLoading={isDataReduxLoading}
      {...propsSelect}
    />
  );
};
