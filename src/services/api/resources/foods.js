import { createApi } from '../lib';

export const getFoods = createApi({
  url: 'food',
  method: 'get',
  transformResponse: (res) => res.body,
});

export const addFood = createApi({
  url: 'food',
  method: 'post',
  transformResponse: (res) => res.body,
});

export const removeFood = createApi({
  url: 'food/:id',
  method: 'delete',
  transformResponse: (res) => res.body,
});
