import { USER_LOCAL_STORAGE_KEY, API_BASE_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { createHttpClient } from '@/utils/httpClient';
import dynamicArgs from '@/utils/dynamicArgs';
import { useLoading } from '@/services/loading';
import { getFromStorage } from '@/utils/storage';

export const httpClient = createHttpClient(API_BASE_URL, {
  'Authorization': getFromStorage(USER_LOCAL_STORAGE_KEY)?.accessToken
});

export const useFetch = (request, defaultValue, dependencies = []) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [activeFetch, setActiveFetch] = useState();
  const reload = () => {
    const fetchRequest = request()
      .then((newData) => {
        setData(newData);
        return newData;
      })
      .finally(() => {
        setLoading(false);
      });
    setActiveFetch(fetchRequest);
    return fetchRequest;
  };

  useEffect(() => {
    reload();
  }, dependencies);
  useEffect(
    () => () =>
      activeFetch &&
      typeof activeFetch?.cancel === 'function' &&
      activeFetch.cancel(),
    [activeFetch],
  );
  return [data, loading, reload];
};

const urlDynamicParts = (url) =>
  url.split('/').filter((x) => x.startsWith(':'));

export const createApi =
  ({
    url,
    method = 'get',
    transformResponse = (x) => x,
    headers = {},
    bodyType = 'json',
  }) =>
  (...args) => {
    const getNextArg = dynamicArgs(args);

    let finalUrl = url;
    urlDynamicParts(url).forEach((dynamicUrlPart) => {
      const value = getNextArg();
      finalUrl = finalUrl.replace(dynamicUrlPart, value);
    });

    let body;
    let contentType = ' application/json';
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      body = getNextArg();
      if (bodyType === 'json') {
        body = JSON.stringify(body);
        contentType = ' application/json';
      } else if (bodyType === 'formdata') {
        const formData = new FormData();
        Object.entries(body).forEach(([key, val]) => {
          formData.append(key, val);
        });
        body = formData;
        // contentType = 'multipart/form-data'; let browser calculate
      } // else is blob and no need to transform
    }

    const queryParams = getNextArg();
    const fakeQueryUrl = new URL('https://example.org');
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          return value.forEach((val) =>
            fakeQueryUrl.searchParams.append(key, val),
          );
        }
        return fakeQueryUrl.searchParams.append(key, value);
      });
      finalUrl += fakeQueryUrl.search;
    }

    const sendRequest = () =>
      httpClient[method](finalUrl, {
        headers: {
          ...headers,
          ...(contentType && { 'content-type': contentType }),
          'Authorization': getFromStorage(USER_LOCAL_STORAGE_KEY)?.accessToken
        },
        body,
      });

    let finalPromise = sendRequest();

    return finalPromise.then(transformResponse);
  };

  export const useCancelablePromise = () => {
    const [, setLoading] = useLoading();
    const [loadingCount, setLoadingCount] = useState(0);
    const [activePromises, setActivePromises] = useState([]);
  
    useEffect(() => {
      if (loadingCount > 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      return () => setLoading(false);
    }, [loadingCount]);
  
    useEffect(() => () => {
      // cancel all active request on destroy
      activePromises.forEach((promise) => {
        if (typeof promise?.cancel === 'function') {
          promise.cancel();
        }
      });
    }, [activePromises]);
  
    return (apiCall, showLoading = true) => {
      if (typeof apiCall?.finally === 'function') {
        if (showLoading) {
          setLoadingCount((prev) => prev + 1);
          apiCall.finally(() => setLoadingCount((prev) => prev - 1));
        }
        setActivePromises((prev) => [...prev, apiCall]);
      }
      return apiCall;
    };
  };