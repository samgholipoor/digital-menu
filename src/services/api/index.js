import * as categories from './resources/categories';
import * as foods from './resources/foods';
import * as restaurant from './resources/restaurant';

const apis = {
  ...categories,
  ...foods,
  ...restaurant,
};

export { httpClient, useFetch } from './lib';

export default apis;
