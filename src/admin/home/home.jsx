import { Navigate } from 'react-router-dom';

export default function Home() {
  return <Navigate to="/admin/store/new" />;
}

Home.routerConfig = {
  type: 'page',
  path: '/admin',
};
