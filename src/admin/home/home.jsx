import { Navigate } from 'react-router-dom';

export default function Home() {
  return <Navigate to="/admin/store" />;
}

Home.routerConfig = {
  type: 'page',
  path: '/admin',
};
