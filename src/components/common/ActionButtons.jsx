import { mergeClassNames } from '@/utils/react';
import { generateUUID } from '@/utils/uuid';
import { useMemo } from 'react';
import Button from './Button';

const TYPE_BUTTON_TYPE = {
  primary: 'submit',
  error: 'button',
  normal: 'button',
};

export const actionButton = ({
  name = generateUUID(),
  title,
  type = 'normal' /* primary/error/normal */,
  icon = '',
  onClick = () => {},
}) => ({
  name,
  type,
  title,
  buttonType: TYPE_BUTTON_TYPE[type],
  icon,
  onClick,
});

export default function ActionButtons({
  growButtons,
  message,
  className,
  buttons,
  onClick,
  size,
  ...props
}) {
  const handleClick = (button) => {
    button.onClick();
    onClick(button.name);
  };

  const containerClass = useMemo(() => mergeClassNames(
    !growButtons && 'flex flex-row items-center',
    className,
  ), [className, growButtons]);

  return (
    <div className={containerClass} {...props}>
      <div className="flex-grow text-sm text-gray-600">
        { message }
      </div>
      <div className="gap-2 flex flex-row items-center">
        { buttons.map((button) => (
          <Button
            key={button.name}
            type={button.buttonType}
            color={button.type}
            icon={button.icon}
            className={mergeClassNames(growButtons ? 'flex-grow' : '')}
            onClick={() => handleClick(button)}
          >
            { button.title }
          </Button>
        ))}

      </div>
    </div>
  );
}

ActionButtons.defaultProps = {
  growButtons: false,
  buttons: [],
  message: '',
  onClick: () => {},
  size: 'md',
};
