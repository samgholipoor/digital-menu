import { mergeClassNames } from '@/utils/react';
import Icon from './Icon';

export default function HelperBox({
  className,
  icon,
  note,
  description,
  children,
  ...props
}) {
  return (
    <div className={mergeClassNames('flex flex-col items-center', className)} {...props}>
      <div><Icon name={icon} className="w-16 h-16 text-base-content" /></div>
      { note && <div className="text-base-content text-lg text-center max-w-md whitespace-pre-wrap">{ note }</div> }
      { children && (
        <div className="mt-2">
          { children }
        </div>
      ) }
    </div>
  );
}

HelperBox.defaultProps = {
  icon: 'tips_and_updates_black_24dp',
  note: 'There is nothing to show!',
};
