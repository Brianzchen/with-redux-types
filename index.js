import PropTypes from 'prop-types/prop-types';

export default (reducer, types = {}, name = '') => (
  (...args) => {
    const resultState = reducer(...args);
    PropTypes.checkPropTypes(
      types,
      resultState,
      'redux data',
      `${name} reducer`,
    );
    PropTypes.resetWarningCache();
    return resultState;
  }
);
