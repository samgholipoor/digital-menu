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

  return (
    <div>
      {categories?.map((category) => (
        <Cart 
          key={category.id}
          title={category.category_name}
          description={category.category_description}
          image={category.category_image}
        />
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
