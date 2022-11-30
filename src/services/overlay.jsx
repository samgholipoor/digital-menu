import Icon from '@/components/common/Icon';
import { mergeClassNames } from '@/utils/react';
import { generateUUID } from '@/utils/uuid';
import {
  useMemo, useContext, useCallback, createContext, useState,
} from 'react';
import { createPortal } from 'react-dom';

const MODALS_ELEMENT_ID = 'modals';
const TOASTS_ELEMENT_ID = 'toasts';

const overlayContext = createContext();

export function Modal({ children, className }) {
  const root = document.getElementById(MODALS_ELEMENT_ID);
  const content = (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-30 p-4">
      <div className={mergeClassNames('w-full p-0 max-w-4xl', className)}>
        {children}
      </div>
    </div>
  );
  return root && createPortal(content, root);
}

const TOAST_TYPE_TO_ICON = {
  info: 'info_outline_black_24dp',
  success: 'check_circle_outline_black_24dp',
  warning: 'error_outline_black_24dp',
  error: 'highlight_off_black_24dp',
};

export const Toast = ({ children, type }) => {
  const root = document.getElementById(TOASTS_ELEMENT_ID);
  const content = (
    <div className="alert shadow-lg">
      <div>
        <Icon name={TOAST_TYPE_TO_ICON[type]} className={mergeClassNames('w-7 h-7 mr-2', `text-${type}`)} />
        <div className="text-lg">{ children }</div>
      </div>
    </div>
  );
  return root && createPortal(content, root);
};

Toast.defaultProps = {
  type: 'info',
};

export const useOverlay = () => useContext(overlayContext);

export function OverlaysProvider({ children }) {
  const [overlays, setOverlays] = useState([]);

  const showToast = useCallback((text, type, timeout = 3000) => new Promise((resolve) => {
    const overlayObject = {
      id: generateUUID(),
      Component: Toast,
      props: {
        type,
        children: text,
      },
    };
    setOverlays((prev) => [
      ...prev,
      overlayObject,
    ]);
    setTimeout(() => {
      setOverlays((prev) => {
        const index = prev.indexOf(overlayObject);
        if (index > -1) {
          resolve();
          return [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ];
        }
      });
    }, timeout);
  }), []);

  const providerValue = useMemo(() => ({
    showToast,
  }), [showToast]);

  return (
    <overlayContext.Provider value={providerValue}>
      { children }
      <div id={MODALS_ELEMENT_ID} />
      <div
        id={TOASTS_ELEMENT_ID}
        className="right-0 bottom-0 w-full max-w-md p-2 space-y-2 fixed flex-col flex items-end pointer-events-none"
        style={{ zIndex: 999 }}
      >
        {
          overlays.map((overlay) => (
            <overlay.Component key={overlay.id} {...overlay.props} />
          ))
        }
      </div>
    </overlayContext.Provider>
  );
}
