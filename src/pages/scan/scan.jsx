import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import QrReader from '@/components/scan/scanner';
import Layout from '@/layouts/Pages';

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
    <Layout title="اسکن بارکد">
      <div className="my-6 flex justify-center items-center w-full h-full">
        <div className="w-96">
          <QrReader data={data} setData={setData} onError={setError} />
          { (data === 'No result' || error) &&   
              <p className='text-center'> آماده اسکن بارکد </p>
            }
        </div>
      </div>
    </Layout>
  );
}

Scan.routerConfig = {
  type: 'page',
  path: '/scan',
  autoLogin: true,
  userValidator: (user) => !!user,
};
