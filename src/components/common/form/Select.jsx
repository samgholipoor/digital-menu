import { mergeClassNames } from '@/utils/react';
import typeOf from '@/utils/typeOf';
import { useCallback, useMemo, useEffect } from 'react';
import { useFormField, ErrorMessage, Label } from './Form';

const optionObject = (option) => ({
  title: typeOf(option) === 'object' ? option?.title : option,
  value: typeOf(option) === 'object' ? option?.value : option,
});

export default function Select({
  className,
  label,
  options,
  ...formFieldProps
}) {
  const {
    id,
    value,
    onChange,
    error,
    ...props
  } = useFormField(formFieldProps, undefined);

  const optionsObject = useMemo(() => options.map((option) => {
    const optionObj = optionObject(option);
    const isChecked = value === optionObj.value;
    return {
      ...optionObj,
      isChecked,
    };
  }), [value, options]);

  useEffect(() => {
    if (optionsObject.length && optionsObject.every((option) => !option.isChecked)) {
      onChange(optionsObject[0].value);
    }
  }, [optionsObject]);

  const handleChange = useCallback((event) => {
    const newValue = event.target.value;
    return onChange(newValue);
  }, [value, onChange]);

  return (
    <div className={mergeClassNames(className, 'form-control w-full')} {...props}>
      <Label label={label} fyi={formFieldProps.fyi} />
      <select
        value={value}
        onChange={handleChange}
        className={mergeClassNames(
          'block h-10 bg-base-100 dark:bg-base-300 w-full px-3 text-sm duration-150 transition-colors appearance-none font-semibold',
          'bg-opacity-20 focus:bg-opacity-100 focus:bg-base-100',
          'select select-sm select-bordered rounded',
        )}
      >
        { optionsObject.map((option) => (
          <option value={option.value} key={option.value}>
            { option.title }
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </div>
  );
}

Select.defaultProps = {
  label: '',
  options: [],
};
