export default function Foods() {
  return <div>Foods</div>;
}

Foods.routerConfig = {
  type: 'page',
  path: '/foods/:restaurantId/:categoryId',
  autoLogin: true,
  userValidator: (user) => !!user,
};
