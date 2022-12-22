import React from 'react';
import { QrReader } from 'react-qr-reader';

const QrCodeReader = ({ setData, onError, props }) => {
  
  return (
    <QrReader
      onResult={(result, error) => {
        if (!!result) {
          setData(result?.text);
          onError(null);
        }

        if (!!error) {
          onError(error);
        }
      }}
      constraints={{ facingMode: 'user' }}
      className=''
      style={{ width: '100%' }}
      {...props}
    />
  );
};

export default QrCodeReader;
