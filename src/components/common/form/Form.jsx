import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { mergeClassNames } from '@/utils/react';
import { generateUUID } from '@/utils/uuid';
import ActionButtons from '@/components/common/ActionButtons';
import { useCancelablePromise } from '@/services/api';
import getKeyOr from '@/utils/getKeyOr';
import Icon from '@/components/common/Icon';

const formContext = createContext();

export function Form({
  onSubmit,
  onSuccess,
  onReject,
  action,
  value,
  onChange,
  onUserCommunicate,
  className,
  manual,
  children,
}) {
  const cancelablePromise = useCancelablePromise();
  const [errors, setErrors] = useState({});
  const [validators, setValidators] = useState({});
  const [formatters, setFormatters] = useState({});

  const Component = manual ? 'div' : 'form';

  const setValue = useCallback((newValue) => {
    if (typeof newValue === 'function') {
      onChange(newValue(value));
    } else {
      onChange(newValue);
    }
    onUserCommunicate(true);
  }, [value, onChange]);

  useEffect(() => {
    setErrors({});
  }, [value]);

  const providerValue = useMemo(() => ({
    value,
    setValue,
    errors,
    setErrors,
    validators,
    setValidators,
    formatters,
    setFormatters,
  }), [
    value,
    setValue,
    errors,
    setErrors,
    validators,
    setValidators,
    formatters,
    setFormatters,
  ]);

  const classNames = useMemo(() => mergeClassNames(className), [className]);

  const handleSubmit = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    if (onSubmit(value) === false) {
      return;
    }

    let sendObject = {};
    let hasError = false;
    Object.keys(value).forEach((fieldName) => {
      const formatter = Object.hasOwnProperty.call(formatters, fieldName)
        ? formatters[fieldName]
        : (x) => x;
      const validator = Object.hasOwnProperty.call(validators, fieldName)
        ? validators[fieldName]
        : () => true;
      const fieldValue = formatter(value[fieldName]);
      const validatorResult = validator(fieldValue);
      if (validatorResult !== true) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: validatorResult || 'Value is incorrect!',
        }));
        hasError = true;
      }
      sendObject = {
        ...sendObject,
        [fieldName]: fieldValue,
      };
    });

    if (hasError) {
      const err = {
        status: 400,
        body: {
          message: 'Form error',
        },
      };
      onReject(err);
    } else {
      cancelablePromise(action(sendObject).then((d) => {
        onSuccess(d);
        onUserCommunicate(false);
        return d;
      }).catch((e) => {
        if (e?.status === 400) {
          let newErrors = {
            '': `${e?.body?.message || ''}\n${e?.body?.errors?.join('\n') || ''}`.trim(),
          };
          Object.entries(e?.body?.field_errors || {}).forEach(([fieldName, fieldError]) => {
            newErrors = {
              ...newErrors,
              [fieldName]: fieldError,
            };
          });
          setErrors(newErrors);
        }
        onReject(e);
        return e;
      }));
    }
  }, [
    onSubmit,
    onReject,
    onSuccess,
    action,
    value,
    errors,
    setErrors,
    value,
    onChange,
    validators,
    formatters,
  ]);

  return (
    <formContext.Provider value={providerValue}>
      <Component className={classNames} onSubmit={handleSubmit}>
        { children}
      </Component>
    </formContext.Provider>
  );
}

Form.defaultProps = {
  onSubmit: () => {},
  onSuccess: () => {},
  onReject: () => {},
  action: () => Promise.resolve(),
  value: {},
  onChange: () => {},
  onUserCommunicate: () => {},
  className: '',
  manual: false,
};

export function FormButtons({
  children,
  ...props
}) {
  const { errors } = useContext(formContext);
  return (
    <ActionButtons message={<ErrorMessage error={errors['']} />} {...props} />
  );
}

export function ErrorMessage({ error }) {
  return error && (
    <label className="label">
      <span className="label-text-alt text-error whitespace-pre text-sm">{error}</span>
    </label>
  );
}

export function Label({ fyi, label, htmlFor }) {
  return label && (
    <div className="flex items-center gap-1">
      <label className="label" htmlFor={htmlFor}>
        <span className="label-text text-base">{label}</span>
      </label>
      {fyi && <Icon name="help_outline_black_24dp" className="h-4 w-4 text-gray-600" title={fyi} />}
    </div>
  );
}

const emptyFn = () => {};
const alwaysTrueFn = () => true;
const returnArgFn = (x) => x;

export const useFormField = ({
  ...args
}, defaultValue = undefined) => {
  const parentForm = useContext(formContext);
  const id = useMemo(() => generateUUID(), []);
  const propsOnChange = getKeyOr(args, 'onChange', emptyFn);
  const propsValue = getKeyOr(args, 'value', defaultValue);
  const validator = getKeyOr(args, 'validator', alwaysTrueFn);
  const formatter = getKeyOr(args, 'formatter', returnArgFn);
  const name = getKeyOr(args, 'name', false);
  const {
    name: _1,
    id: _2,
    defaultValue: _3,
    onChange: _4,
    value: _5,
    validator: _6,
    formatter: _7,
    name: _8,
    ...props
  } = args;

  const value = useMemo(() => {
    if (parentForm?.value && name) {
      return getKeyOr(parentForm.value, name, defaultValue);
    }
    return propsValue;
  }, [parentForm?.value, name, defaultValue, propsValue]);

  const onChange = useCallback((newValue) => {
    let finalValue;
    if (typeof newValue === 'function') {
      finalValue = newValue(value);
    } else {
      finalValue = newValue;
    }
    if (parentForm?.setValue && name) {
      return parentForm?.setValue((p) => ({
        ...p,
        [name]: finalValue,
      }));
    }
    return propsOnChange(finalValue);
  }, [parentForm?.setValue, value, propsOnChange]);

  const error = useMemo(() => getKeyOr(parentForm?.errors || {}, name), [parentForm?.errors, name]);

  useEffect(() => {
    if (formatter) {
      parentForm?.setFormatters?.((prev) => ({
        ...prev,
        [name]: formatter,
      }));
    }
  }, [formatter, parentForm?.setFormatters]);

  useEffect(() => {
    if (validator) {
      parentForm?.setValidators?.((prev) => ({
        ...prev,
        [name]: validator,
      }));
    }
  }, [validator, parentForm?.setValidators]);

  return useMemo(() => ({
    id,
    value,
    onChange,
    error,
    ...props,
  }), [id, value, onChange, error, props]);
};
