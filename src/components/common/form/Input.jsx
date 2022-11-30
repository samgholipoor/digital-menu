import { mergeClassNames } from '@/utils/react';
import { useCallback, useMemo } from 'react';
import { useFormField, ErrorMessage, Label } from './Form';

export default function Input({
  className,
  label,
  placeholder,
  multiline,
  multilineAsArray,
  type,
  ...formFieldProps
}) {
  const {
    id,
    value,
    onChange,
    error,
    ...props
  } = useFormField(formFieldProps, multiline && multilineAsArray ? [] : '');

  const Tag = multiline ? 'textarea' : 'input';

  const formattedValue = useMemo(() => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    if (multiline && multilineAsArray) {
      return value.join('\n');
    }
    return value.toString();
  }, [value, multiline, multilineAsArray]);

  const handleChange = useCallback((event) => {
    let newValue = event.target.value;
    if (multiline && multilineAsArray) {
      newValue = newValue.split('\n');
    }
    onChange(newValue);
  }, [onChange, multiline, multilineAsArray]);

  const clearEmptyLinesIfNeeded = useCallback(() => {
    if (multiline && multilineAsArray) {
      onChange(value.filter((x) => !!x));
    }
  }, [value, onChange, multiline, multilineAsArray]);

  return (
    <div className={mergeClassNames(className, 'w-full')} {...props}>
      <Label label={label} htmlFor={id} fyi={formFieldProps.fyi} />
      <Tag
        id={id}
        value={formattedValue}
        type={type}
        onChange={handleChange}
        onBlur={clearEmptyLinesIfNeeded}
        placeholder={placeholder || label}
        className={mergeClassNames(
          'input input-bordered block bg-base-100 dark:bg-base-300 bg-opacity-20 focus:bg-opacity-100 focus:bg-base-100 w-full px-3 rounded text-base duration-150 transition-colors',
          multiline && 'py-2 h-40 min-h-16 max-h-96',
          !multiline && 'h-10',
        )}
      />
      <ErrorMessage error={error} />
    </div>
  );
}

Input.defaultProps = {
  label: '',
  placeholder: '',
  multiline: false,
  type: 'text',
};
