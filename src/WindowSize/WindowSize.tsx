/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { throttle, render } from '../utils';

export interface WindowSizeProps {
  width: number;
  height: number;
}

export interface WindowSizeConfig {
  throttle?: number;
}

export class WindowSize extends React.Component<
  WindowSizeConfig & SharedRenderProps<WindowSizeProps>,
  WindowSizeProps
> {
  static defaultProps: Partial<WindowSizeConfig> = {
    throttle: 100,
  };

  state: WindowSizeProps = { width: 0, height: 0 };

  handleWindowSize = throttle(() => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }, this.props.throttle!);

  componentDidMount() {
    this.handleWindowSize();
    window.addEventListener('resize', this.handleWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSize);
  }

  render() {
    return render(this.props, this.state);
  }
}
