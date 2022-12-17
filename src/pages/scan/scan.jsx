import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import QrReader from '@/components/scan/scanner';


export default function Scan() {
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  
  useEffect(() => {
    if(data && data !== 'No result'){
      console.log(data);
      navigate(`/categories/${data}`);
    }
  } , [data]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-96">
        <QrReader data={data} setData={setData} onError={setError} />
        { (data === 'No result' || error) &&   
            <p> آماده اسکن بارکد </p>
        }
      </div>
    </div>
  );
}

Scan.routerConfig = {
  type: 'page',
  path: '/scan',
  autoLogin: true,
  userValidator: (user) => !!user,
};
