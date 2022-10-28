import { createApi } from '../lib';

export const getCategories = createApi({
  url: 'comments',
  method: 'get',
  transformResponse: (res) => res.body,
});
