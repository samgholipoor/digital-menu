import apis, { useFetch } from '@/services/api';
import Layout from '@/layouts/Pages';
import Cart from '@/components/common/cart';
import { useParams } from "react-router-dom";
import { useMemo } from 'react';
import 'react-rater/lib/react-rater.css';

export default function Foods() {
  const { restaurantId, categoryId } = useParams();
  
  const [{category, foods}, loading] = useFetch(
    () => apis.getCategoryFoods(restaurantId, categoryId),
    [],
    [],
  );

  const render = useMemo(() => {
    if(loading){
      return <div>loading...</div>
    }

    if (!loading && category && foods) {
      return (
        <>
          <div>
            <div className='bg-base-200 bg-opacity-80 p-5 rounded-md my-4' dir='rtl'>
              <div className='flex flex-col sm:flex-row justify-between'>
                <div className='flex flex-col gap-1'>
                  <h2>نام رستوران: {category.category_name}</h2>
                  <p>شماره رستوران: {category.category_description}</p>
                </div>
                <div className='hidden sm:block'>
                  <img src={`/images/${category.category_image}`} />
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {!!foods.length ? foods?.map((food) => (
              <Cart 
                key={food._id}
                title={food.food_name}
                description={food.food_description}
                price={food.food_price}
                image={food.food_image}
              />
            )) : 
            <h2 className='text-center text-xl font-bold text-gray-800 my-4'> 
              غذایی برای این دسته بندی یافت نشد 
            </h2>
          }
          </div>  
        </>
      );
    }
  }, [loading, category, foods]);

  return (
    <Layout title={category?.category_name}>
      {render}
    </Layout>
  );
}

Foods.routerConfig = {
  type: 'page',
  path: '/foods/:restaurantId/:categoryId',
  autoLogin: true,
  userValidator: (user) => !!user,
};
