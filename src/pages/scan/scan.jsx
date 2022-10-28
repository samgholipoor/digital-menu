import apis, { useFetch } from '@/services/api';
import { useEffect } from 'react';

export default function Scan() {
  const [availableLinkTypes] = useFetch(() => apis.getCategories(), [], []);

  useEffect(() => {
    console.log(availableLinkTypes);
  }, [availableLinkTypes]);

  return <div> Scan </div>;
}

Scan.routerConfig = {
  type: 'page',
  path: '/scan',
  autoLogin: true,
  userValidator: (user) => !!user,
};
