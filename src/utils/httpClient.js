import CancelablePromise from 'cancelable-promise';

const mergeUrls = (...parts) =>
  parts.join('/').replace(/(http.?:\/\/)|(\/){2,}/g, '$1$2');

export const createHttpClient = (baseUrl, baseHeaders = {}) =>
  new Proxy(
    {},
    {
      get: (_target, p) => {
        if (['get', 'post', 'patch', 'delete', 'put'].includes(p)) {
          return (endpoint, fetchOptions = {}) =>
            new CancelablePromise((resolve, reject, onCancel) => {
              const method = p.toUpperCase();
              const abortController = new AbortController();
              onCancel(() => abortController.abort());

              let returnValue = {
                ok: false,
                status: 0,
                headers: {},
                body: undefined,
              };
              // send request
              fetch(`${mergeUrls(baseUrl, endpoint)}`, {
                method,
                headers: {
                  ...baseHeaders,
                  ...fetchOptions.headers,
                },
                body: fetchOptions.body,
                signal: abortController.signal,
              })
                .then((fetchResponse) => {
                  // append status, ok, and headers
                  returnValue = {
                    ...returnValue,
                    headers: fetchResponse.headers,
                    ok: fetchResponse.ok,
                    status: fetchResponse.status,
                  };
                  return fetchResponse.text();
                })
                .then((bodyAsText) => {
                  try {
                    returnValue = {
                      ...returnValue,
                      body: JSON.parse(bodyAsText),
                    };
                  } catch (_e) {
                    returnValue = {
                      ...returnValue,
                      body: bodyAsText,
                    };
                  }
                  return returnValue;
                })
                .then((finalValue) => {
                  if (finalValue.ok) {
                    return resolve(finalValue);
                  }
                  return reject(finalValue);
                })
                .catch(() => reject(returnValue));
            });
        }
        return undefined;
      },
    },
  );
