import apis, { useFetch } from '@/services/api';
import Rater from 'react-rater'
import Layout from '@/layouts/Default';
import Cart from '@/components/common/cart';
import { useParams } from "react-router-dom";
import { useMemo } from 'react';
import 'react-rater/lib/react-rater.css';

export default function Categories() {
  const { restaurantId } = useParams();
  
  const [{store, items}, loading] = useFetch(
    () => apis.getStoreCategories(restaurantId),
    [],
    [],
  );

  const render = useMemo(() => {
    if(loading){
      return <div>loading...</div>
    }

    if (!loading && store && items) {
      return (
        <>
          <div>
            <div className='bg-base-200 bg-opacity-80 p-5 rounded-md my-4' dir='rtl'>
              <div className='flex flex-col sm:flex-row justify-between'>
                <div className='flex flex-col gap-1'>
                  <h2>نام رستوران: {store.store_name}</h2>
                  <p>شماره رستوران: {store.store_tel}</p>
                  <h2>شناسه رستوران: {store.store_id}</h2>
                  <p>مالک رستوران: {store.owner_name}</p>
                  <Rater total={5} rating={store.store_rate} />
                </div>
                <div className='hidden sm:block'>
                  <img src={store.store_qr} />
                </div>
              </div>
              <p className='pt-2 sm:pt-4'>آدرس رستوران: {store.store_address}</p>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {!!items.length ?  items?.map((category) => (
              <Cart 
                key={category._id}
                title={category.category_name}
                description={category.category_description}
                image={category.category_image}
                id={category._id}
                hasButton
              />
            )) : 
            <h2 className='text-center text-xl font-bold text-gray-800 my-4'> 
              کتگوری برای این رستوران یافت نشد 
            </h2>
          }
          </div>  
        </>
      );
    }
  }, [loading, store, items]);

  return (
    <Layout >
      {render}
    </Layout>
  );
}

Categories.routerConfig = {
  type: 'page',
  path: '/categories/:restaurantId/',
  autoLogin: true,
  userValidator: (user) => !!user,
};
