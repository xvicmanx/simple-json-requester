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

const buildConfiguration = (config) => {
  return Object.assign(
    {},
    DEFAULT_CONFIG,
    config,
  );
};


/**
 * @typedef {Object} Config
 * @property {boolean} cors - to specify if it is a CORS request
 * @property {object} extraHeaders - extra headers to be sent in the request
 * @property {boolean} useDefaultHeaders - to specify if the default headers used
 */

const DEFAULT_CONFIG = {
  cors: false,
  extraHeaders: {},
  useDefaultHeaders: true,
};

/**
 * Makes a Request sending JSON data
 * @param {string} url - endpoint url
 * @param {object} payload  - request's payload
 * @param {string} method - request method (GET, POST, PUT, DELETE)
 * @param {boolean} inBody - To specify if the payload goes in the body
 * @param {Config} configuration - configuration
 * @returns {Promise}
 */
const sendJSON = (
  url,
  payload,
  method = METHODS.GET,
  inBody = false,
  configuration = {},
) => {
  const config = buildConfiguration(configuration);
  let fetchUrl = url;
  const options = {
    method,
    headers: {
      ...(config.useDefaultHeaders ? defaultHeaders : {}),
      ...config.extraHeaders,
      ...(config.cors ? corsHeaders : {})
    },
  };

  if (config.cors) {
    options.mode = 'cors';
  }

  if (inBody) {
    options.body = JSON.stringify(payload);
  } else {
    const params = objectToParams(payload);
    fetchUrl = `${url}?${params}`;
  }

  return fetch(fetchUrl, options).then(r => r.json());
};


const requester = {
  /**
    *  Makes a GET request to the given url passing the payload data in the url
    * @param {string} url - endpoint url
    * @param {Object} payload  - request's payload
    * @param {Config} config - configuration object
    * @returns {Promise}
   */
  get: (url, payload = {}, config = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.GET,
      false,
      config
    );
  },
  /**
    *  Makes a POST request to the given url passing the payload data
    * @param {string} url - endpoint url
    * @param {Object} payload  - request's payload
    * @param {Config} config - configuration object
    * @returns {Promise}
   */
  post: (url, payload = {}, config = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.POST,
      true,
      config
    );
  },
  /**
    *  Makes a PUT request to the given url passing the payload data
    * @param {string} url - endpoint url
    * @param {Object} payload  - request's payload
    * @param {Config} config - configuration object
    * @returns {Promise}
   */
  put: (url, payload = {}, config = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.PUT,
      true,
      config
    );
  },
  /**
    *  Makes a DELETE request to the given url passing the payload data
    * @param {string} url - endpoint url
    * @param {Object} payload  - request's payload
    * @param {Config} config - configuration object
    * @returns {Promise}
   */
  delete: (url, payload = {}, config = {}) => {
    return sendJSON(
      url,
      payload,
      METHODS.DELETE,
      true,
      config
    );
  }
};

// Requester
module.exports =  requester;
