import { Navigate } from 'react-router-dom';

export default function Home() {
  return <Navigate to="/scan" />;
}

Home.routerConfig = {
  type: 'page',
  path: '/',
};
