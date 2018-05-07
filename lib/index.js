require('es6-promise').polyfill();
require('isomorphic-fetch');

// REQUEST Methods
const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Default Headers for JSON data
const defaultHeaders = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
};

/**
 * Converts an object to its url params representation.
 * @param {object} obj 
 * @returns {string} - the url encoded version of the object.
 */
const objectToParams = (obj) => {
  return Object.keys(obj)
    .map(k => `${k}=${obj[k]}`)
    .join("&");
};

/**
 * Makes a Request sending JSON data
 * @param {string} url - endpoint url
 * @param {object} payload  - request's payload
 * @param {string} method - request method (GET, POST, PUT, DELETE)
 * @param {boolean} inBody - To specify if the payload goes in the body
 * @param {true} cors - to specify if it is a CORS request
 * @param {object} extraHeaders - extra headers to be sent in the request
 * @returns {Promise}
 */
const sendJSON = (
  url,
  payload,
  method = METHODS.GET,
  inBody = false,
  cors = false,
  extraHeaders = {},
) => {
  let fetchUrl = url;
  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...extraHeaders,
      ...(cors ? corsHeaders : {})
    },
  };

  if (cors) {
    config.mode = 'cors';
  }

  if (inBody) {
    config.body = JSON.stringify(payload);
  } else {
    const params = objectToParams(payload);
    fetchUrl = `${url}?${params}`;
  }

  return fetch(fetchUrl, config).then(r => r.json());
};

// Requester
export default {
  /**
    *  Makes a GET request to the given url passing the payload data in the url
    * @param {string} url - endpoint url
    * @param {object} payload  - request's payload
    * @param {true} cors - to specify if it is a CORS request
    * @param {object} extraHeaders - extra headers to be sent in the request
    * @returns {Promise}
   */
  get: (url, payload, cors = false, extraHeaders = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.GET,
      false,
      cors,
      extraHeaders
    );
  },
  /**
    *  Makes a POST request to the given url passing the payload data
    * @param {string} url - endpoint url
    * @param {object} payload  - request's payload
    * @param {true} cors - to specify if it is a CORS request
    * @param {object} extraHeaders - extra headers to be sent in the request
    * @returns {Promise}
   */
  post: (url, payload, cors = false, extraHeaders = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.POST,
      true,
      cors,
      extraHeaders
    );
  },
  /**
    *  Makes a PUT request to the given url passing the payload data
    * @param {string} url - endpoint url
    * @param {object} payload  - request's payload
    * @param {true} cors - to specify if it is a CORS request
    * @param {object} extraHeaders - extra headers to be sent in the request
    * @returns {Promise}
   */
  put: (url, payload, cors = false, extraHeaders = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.PUT,
      true,
      cors,
      extraHeaders
    );
  },
  /**
    *  Makes a DELETE request to the given url passing the payload data
    * @param {string} url - endpoint url
    * @param {object} payload  - request's payload
    * @param {true} cors - to specify if it is a CORS request
    * @param {object} extraHeaders - extra headers to be sent in the request
    * @returns {Promise}
   */
  delete: (url, payload, cors = false, extraHeaders = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.DELETE,
      true,
      cors,
      extraHeaders
    );
  }
};
