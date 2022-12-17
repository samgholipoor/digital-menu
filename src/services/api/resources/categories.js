import { createApi } from '../lib';

export const getCategories = createApi({
  url: 'category',
  method: 'get',
  transformResponse: (res) => res.body,
});

export const addCategory = createApi({
  url: 'category',
  method: 'post',
  transformResponse: (res) => res.body,
});

export const removeCategory = createApi({
  url: 'category/:id',
  method: 'delete',
  transformResponse: (res) => res.body,
});
