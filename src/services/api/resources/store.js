import { createApi } from '../lib';

export const getStore = createApi({
  url: 'store',
  method: 'get',
  transformResponse: (res) => res.body,
});

export const addStore = createApi({
  url: 'store',
  method: 'post',
  transformResponse: (res) => res.body,
});

export const updateStore = createApi({
  url: 'store/:id',
  method: 'patch',
  transformResponse: (res) => res.body,
});
