import { createApi } from '../lib';

export const getCategories = createApi({
  url: 'category/:store_id',
  method: 'get',
  transformResponse: (res) => res.body,
});

export const addCategory = createApi({
  url: 'category/:store_id',
  method: 'post',
  transformResponse: (res) => res.body,
});

export const removeCategory = createApi({
  url: 'category/:id',
  method: 'delete',
  transformResponse: (res) => res.body,
});

// client 

export const getStoreCategories = createApi({
  url: 'category/:id/client',
  method: 'get',
  transformResponse: (res) => res.body,
});