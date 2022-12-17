import apis, { useFetch } from '@/services/api';
import Cart from '@/components/common/cart';
import { useParams } from "react-router-dom";

export default function Categories() {
  const { restaurantId } = useParams();
  
  const [categories] = useFetch(
    () => apis.getStoreCategories(restaurantId),
    [],
    [],
  );

  console.log(categories);

  return (
    <div>
      {/* {list?.map((category) => (
        <Cart key={category.id} {...category} />
      ))} */}
    </div>
  );
}

Categories.routerConfig = {
  type: 'page',
  path: '/categories/:restaurantId/',
  autoLogin: true,
  userValidator: (user) => !!user,
};
