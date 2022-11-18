import QrReader from '@/components/scan/scanner';
import { useState } from 'react';

export default function Scan() {
  const [data, setData] = useState('No result');
  const [showQrReader, setShowQrReader] = useState(false);
  return (
    <div className="flex justify-center items-center w-full h-full">
      {!showQrReader ? (
        <button
          className="btn btn-primary text-lg font-medium my-5"
          onClick={() => setShowQrReader(true)}
        >
          باز کردن اسکنر
        </button>
      ) : (
        <div className="w-96">
          <QrReader data={data} setData={setData} />
        </div>
      )}
    </div>
  );
}

Scan.routerConfig = {
  type: 'page',
  path: '/scan',
  autoLogin: true,
  userValidator: (user) => !!user,
};
