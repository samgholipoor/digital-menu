import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrCodeReader = ({ data, setData, props }) => {
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.log(error);
          }
        }}
        constraints={{ facingMode: 'user' }}
        style={{ width: '100%' }}
        {...props}
      />
      <p className="text-lg text-center">{data}</p>
    </>
  );
};

export default QrCodeReader;
