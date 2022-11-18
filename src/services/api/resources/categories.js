import { createApi } from '../lib';

export const getCategories = createApi({
  url: 'categories',
  method: 'get',
  transformResponse: (res) => res.body,
});

export const addCategory = createApi({
  url: 'categories',
  method: 'post',
  transformResponse: (res) => res.body,
});
