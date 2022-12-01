import * as categories from './resources/categories';
import * as foods from './resources/foods';
import * as restaurant from './resources/restaurant';
import * as store from './resources/store';

const apis = {
  ...categories,
  ...foods,
  ...restaurant,
  ...store,
};

export { httpClient, useFetch, useCancelablePromise } from './lib';

export default apis;
