import * as React from 'react';
import { render } from '../';

jest.mock('react', () => ({
  createElement: jest.fn(),
  Children: {
    only: jest.fn(),
    count: jest.fn(() => 1), // mock only child
  },
}));

describe('render()', () => {
  it('renders the component by using `React.createElement`', () => {
    // Given
    const component = jest.fn();
    const props = {
      component,
    };
    const state = {};

    // When
    render(props, state);

    // Then
    expect(React.createElement).toHaveBeenCalledWith(component, state);
  });

  it('invokes the render prop', () => {
    // Given
    const renderProp = jest.fn();
    const props = {
      render: renderProp,
    };
    const state = {};

    // When
    render(props, state);

    // Then
    expect(renderProp).toHaveBeenCalledTimes(1);
    expect(renderProp).toHaveBeenCalledWith(state);
  });

  it('renders the children as a function', () => {
    // Given
    const children = jest.fn();
    const props = {
      children,
    };
    const state = {};

    // When
    render(props, state);

    // Then
    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith(state);
  });

  it('renders the children by using `React.Children.only`', () => {
    // Given
    const DumbComponent = jest.fn(() => <div>dummy</div>);
    const children = new DumbComponent();
    const props = {
      children,
    };
    const state = {};

    // When
    render(props, state);

    // Then
    expect(React.Children.only).toHaveBeenCalledTimes(1);
    expect(React.Children.only).toHaveBeenCalledWith(children);
  });

  it('renders `null` otherwise', () => {
    // Given
    const props = {};
    const state = {};

    // When
    const result = render(props, state);

    // Then
    expect(result).toEqual(null);
  });
});
