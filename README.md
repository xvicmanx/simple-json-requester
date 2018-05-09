# Simple JSON Requester

A simple util to make json requests.

## Getting Started

To get started, install the package and start using the library.

```bash
  npm install simple-json-requester --save
```

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
 
<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Contributing

Feel free to make any suggestion to improve this project.


## Authors

See the list of [contributors](https://github.com/xvicmanx/simple-json-requester/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
