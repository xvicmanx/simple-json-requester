# Simple JSON Requester

A simple util to make json requests.

## Getting Started

To get started, install the package and start using the library.

```bash
  npm install simple-json-requester --save
```
## Example
```js
const requester = require('simple-json-requester');

// A simple get request
requester.get(
  'http://localhost:1234/article',
  {
    title: 'Foo'
  }
).then(function(data) {
  console.log(data);
});

// A simple post request
requester.post(
  'http://localhost:1234/article/create',
  {
    title: 'Foo'
    content: 'Bar!'
  }
).then(function(data) {
  console.log(data);
});

// A simple put request
requester.put(
  'http://localhost:1234/article/update',
  {
    title: 'Foo'
    content: 'Bar!'
  }
).then(function(data) {
  console.log(data);
});

// A simple delete request
requester.delete('http://localhost:1234/article/1/remove').then(function(data) {
  console.log(data);
});

```
 
## Methods

### get
Makes a `GET` request to an especified endpoint.

| Attribute | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `url`     | string | Yes      | Endpoint's url                                                        |
| `data`    | object | No       | Request data. This data is sent via the url params.                   |
| `config`  | object | No       | Configuration object. To setup extra things such as cors, and headers.|

### post
Makes a `POST` request to an especified endpoint.

| Attribute | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `url`     | string | Yes      | Endpoint's url                                                        |
| `data`    | object | No       | Request data. This data is sent in the body.                          |
| `config`  | object | No       | Configuration object. To setup extra things such as cors, and headers.|

### put
Makes a `PUT` request to an especified endpoint.

| Attribute | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `url`     | string | Yes      | Endpoint's url                                                        |
| `data`    | object | No       | Request data. This data is sent in the body.                          |
| `config`  | object | No       | Configuration object. To setup extra things such as cors, and headers.|

### delete
Makes a `DELETE` request to an especified endpoint.

| Attribute | Type   | Required | Description                                                           |
| --------- | ------ | -------- | --------------------------------------------------------------------- |
| `url`     | string | Yes      | Endpoint's url                                                        |
| `data`    | object | No       | Request data. This data is sent in the body.                          |
| `config`  | object | No       | Configuration object. To setup extra things such as cors, and headers.|

All of these methods return a promise that resolves in data in JSON format.

## Contributing

Feel free to make any suggestion to improve this project.


## Authors

See the list of [contributors](https://github.com/xvicmanx/simple-json-requester/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
