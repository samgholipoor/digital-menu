import { createApi } from '../lib';

export const getFoods = createApi({
  url: 'food/:store_id',
  method: 'get',
  transformResponse: (res) => res.body,
});

export const addFood = createApi({
  url: 'food/:store_id',
  method: 'post',
  transformResponse: (res) => res.body,
});

export const removeFood = createApi({
  url: 'food/:id',
  method: 'delete',
  transformResponse: (res) => res.body,
});

// client 

export const getCategoryFoods = createApi({
  url: 'food/:restaurantId/:categoryId/client',
  method: 'get',
  transformResponse: (res) => res.body,
});