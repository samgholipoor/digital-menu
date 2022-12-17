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
      className='border border-blue-400'
      videoContainerStyle={{ border: '1px solid blue'}}
      videoStyle={{ border: '4px solid green' }}
      style={{ width: '100%' }}
      {...props}
    />
  );
};

export default QrCodeReader;
