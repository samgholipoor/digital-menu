export default function Scan() {
  return <div> Scan </div>;
}

Scan.routerConfig = {
  type: 'page',
  path: '/scan',
  autoLogin: true,
  userValidator: (user) => !!user,
};
