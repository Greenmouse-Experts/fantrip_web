import { FC } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
export interface IOption {
  label: string;
  value: string | number;
  name?: string;
  disabled?: boolean;
}

export interface IOptionGroup {
  label?: string;
  options: IOption[];
  altClass?: string;
  labelClassName?: string;
  mainLabelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  [key: string]: any;
  region?: boolean;
  required?: boolean;
  selected?: string;
}

const RadioButtonGroup: FC<IOptionGroup> = ({
  label,
  options,
  altClass,
  labelClassName,
  mainLabelClassName,
  onChange,
  error,
  required,
  selected,
}) => {
  return (
    <>
      <label className={mainLabelClassName || ''}>
        {label} {required && <span className="fw-600 text-red-600">*</span>}
      </label>
      <div className={altClass || 'grid'}>
        {options.map((item, i) => (
          <div className="flex gap-x-2 items-center" key={i}>
            <input
              type="radio"
              onChange={onChange}
              name={item.name || 'option'}
              value={item.value || ''}
              checked={item.value === selected}
              disabled={item.disabled}
            />
            <label className={labelClassName || ''}>
              {item.label}
            </label>
          </div>
        ))}
        <>
          {error && (
            <span className="fs-500 fw-500 text-red-500">
              {error.toString()}
            </span>
          )}
        </>
      </div>
    </>
  );
};
export default RadioButtonGroup;