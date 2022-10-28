export default function Categories() {
  return <div>Categories</div>;
}

Categories.routerConfig = {
  type: 'page',
  path: '/categories/:restaurantId/',
  autoLogin: true,
  userValidator: (user) => !!user,
};
