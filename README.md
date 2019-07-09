<h1 align="center">Welcome to with-redux-types 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> Runtime type checker for redux with PropTypes

A common use case is that you want to store payloads from the backend in your redux store, that is then consumed by other parts of the application. This can often be a scary thing because you cannot validate data in the central store is what you expect it to be since it's defined by the backend.

PropTypes to the rescue. `with-redux-types` wraps usage of `prop-types` and allows you get runtime errors that allows you to highlight bugs or inconsistencies in your builds early. It also provides helpful feedback by pushing errors to the console if it happens in production that you can then push into alerting tools.

## Installation

```sh
yarn add with-redux-types
```

## Usage

Because this is a runtime validation, it's recommended you run this in production mode to get the most value, which you can do by importing `prop-types/prop-types` instead of `prop-types`.

```js
// types.js
import PropTypes from 'prop-types/prop-types';

export default {
  something: PropTypes.shape({
    stuff: PropTypes.oneOf([
      'this',
      'or',
      'that',
    ]),
  }).isRequired,
  else: PropTypes.arrayOf(PropTypes.shape({
    thingy: PropTypes.number.isRequired,
    that: PropTypes.string,
  })).isRequired,
}

// reducer.js
import withReduxTypes from 'with-redux-types';

import types from './types';

export default withReduxTypes((state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}), types, 'name')
```

### Output

![Sample error message](./error-message.png)

## Development

### Install

```sh
yarn
```

### Run tests

```sh
yarn test
```

## Show your support

Give a ⭐️ if this project helped you!
