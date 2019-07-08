import PropTypes from 'prop-types';
import { lorem } from 'faker';

import withReduxTypes from '.';

describe('withReduxTypes', () => {
  const prop1 = lorem.word();
  const prop2 = lorem.word();
  const prop3 = lorem.word();

  const types = {
    [prop1]: PropTypes.string,
    [prop2]: PropTypes.number.isRequired,
    [prop3]: PropTypes.shape({
      [prop1]: PropTypes.string,
    }),
  };

  jest.spyOn(global.console, 'error');

  beforeEach(() => {
    global.console.error.mockClear();
  });

  it('throws error', () => {
    withReduxTypes(
      () => jest.fn(() => ({

      })),
      types,
      'test',
    )();

    expect(global.console.error).toHaveBeenCalled();
  });

  it('does not throw an error when valid', () => {
    expect(global.console.error).not.toHaveBeenCalled();

    withReduxTypes(
      () => ({
        [prop1]: 'hi',
        [prop2]: 5,
        [prop3]: {
          [prop1]: 'test',
        },
      }),
      types,
      'test',
    )();

    expect(global.console.error).not.toHaveBeenCalled();
  });

  it('does not throw error when non required prop is not passed', () => {
    expect(global.console.error).not.toHaveBeenCalled();

    withReduxTypes(
      () => ({
        [prop2]: 5,
        [prop3]: {},
      }),
      types,
      'test',
    )();

    expect(global.console.error).not.toHaveBeenCalled();
  });
});
