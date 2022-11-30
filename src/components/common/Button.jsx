import { mergeClassNames } from '@/utils/react';
import Icon from '@/components/common/Icon';
import { useMemo } from 'react';
import { Spinner } from '@/services/loading';

export default function Button({
  component,
  icon,
  selected,
  color,
  size,
  square,
  transparent,
  className,
  children,
  loading,
  ...props
}) {
  const Component = component;

  const colorClass = useMemo(() => ({
    normal: !selected && 'bg-base-content dark:bg-opacity-20',
    primary: !selected && 'text-primary bg-primary dark:text-primary-content dark:bg-opacity-70',
    danger: !selected && 'text-red-500 bg-red-500 dark:bg-opacity-30',
  }[color]), [color, selected]);

  const sizeClass = useMemo(() => ({
    md: mergeClassNames('h-10 text-sm', square && 'w-10'),
    sm: mergeClassNames('h-8 text-sm', square && 'w-8'),
  }[size]), [size]);

  const iconSizeClass = useMemo(() => ({
    md: 'w-5 h-5',
    sm: 'w-4 h-4',
  }[size]), [size]);

  return (
    <Component
      className={
        mergeClassNames(
          'inline-flex items-center justify-center gap-2 rounded-md duration-150 whitespace-nowrap font-semibold relative overflow-hidden',
          transparent ? 'bg-opacity-0' : 'bg-opacity-5',
          !square && 'px-3',
          sizeClass,
          colorClass,
          !selected && 'hover:bg-opacity-x1 focus:bg-opacity-x2 active:bg-opacity-x3 cursor-pointer',
          selected && 'bg-primary text-primary-content bg-opacity-100 cursor-default',
          className,
        )
      }
      {...props}
    >
      { icon && <Icon name={icon} className={iconSizeClass} /> }
      { children && <span>{ children }</span> }
      {loading && (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-base-300 bg-opacity-50">
          <Spinner className={iconSizeClass} />
        </div>
      )}
    </Component>
  );
}

Button.defaultProps = {
  component: 'button',
  color: 'normal',
  icon: '',
  size: 'md', // md sm
  square: false,
  selected: false,
  loading: false,
};
