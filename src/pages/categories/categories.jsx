import apis, { useFetch } from '@/services/api';
import { useEffect } from 'react';
import Cart from '@/components/common/cart';

export default function Categories() {
  const restaurantId = 3;
  const [list] = useFetch(
    () => apis.getCategories({ restaurantId: restaurantId }),
    [],
    [],
  );

  useEffect(() => {
    console.log(list);
  }, [list]);

  const handleClick = () => {
    apis.addCategory({
      title: 'دسر',
      description: 'دسر',
      image: 'https://picsum.photos/200/300',
      restaurantId,
    });
  };

  return (
    <div>
      <button onClick={handleClick}> click me </button>
      {list?.map((category) => (
        <Cart key={category.id} {...category} />
      ))}
    </div>
  );
}

Categories.routerConfig = {
  type: 'page',
  path: '/categories/:restaurantId/',
  autoLogin: true,
  userValidator: (user) => !!user,
};
