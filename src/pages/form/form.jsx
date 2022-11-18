import { useState } from 'react';
import CategoryForm from '@/components/form/category';
import FoodForm from '@/components/form/food';
import cx from '@/utils/classname';

export default function Scan() {
  const [tab, setTab] = useState('category');

  const handleClick = (type) => {
    setTab(type);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="my-8 w-full flex justify-center ">
          <div className="btn-group -translate-x-1/2">
            <button
              onClick={() => handleClick('food')}
              className={cx('btn w-full', {
                'btn-active': tab === 'food',
              })}
            >
              غذا ها
            </button>
            <button
              onClick={() => handleClick('category')}
              className={cx('btn w-full', {
                'btn-active': tab === 'category',
              })}
            >
              دسته بندی ها
            </button>
          </div>
        </div>
        {tab === 'category' && <CategoryForm />}
        {tab === 'food' && <FoodForm />}
      </div>
    </div>
  );
}

Scan.routerConfig = {
  type: 'page',
  path: '/form',
  autoLogin: true,
  userValidator: (user) => !!user,
};
