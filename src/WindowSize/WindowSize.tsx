/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from '../utils';
import { throttle } from '../utils/throttle';

export interface WidnowSizeProps {
  width: number;
  height: number;
}

export interface WindowSizeConfig {
  throttle?: number;
}

export class WindowSize extends React.Component<
  WindowSizeConfig & SharedRenderProps<WidnowSizeProps>,
  WidnowSizeProps
> {
  static defaultProps = {
    debounce: 100,
  };

  state: WidnowSizeProps = { width: 0, height: 0 };

  handleWindowSize = throttle(() => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }, this.props.throttle);

  componentDidMount() {
    this.handleWindowSize();
    window.addEventListener('resize', this.handleWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSize);
  }

  render() {
    const { render, component, children } = this.props;
    return component
      ? React.createElement(component as any, this.state)
      : render
        ? (render as any)(this.state)
        : children // children come last, always called
          ? typeof children === 'function'
            ? children(this.state)
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
