/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { renderComponentWithRenderProps } from '../utils';
import { throttle } from '../utils/throttle';

export interface ScrollProps {
  x: number;
  y: number;
}

export interface ScrollConfig {
  throttle?: number;
}

export class Scroll extends React.Component<
  ScrollConfig & SharedRenderProps<ScrollProps>,
  ScrollProps
> {
  static defaultProps = {
    throttle: 100,
  };

  state: ScrollProps = { x: 0, y: 0 };

  handleWindowScroll = throttle(() => {
    this.setState({ x: window.scrollX, y: window.scrollY });
  }, this.props.throttle);

  componentDidMount() {
    this.handleWindowScroll();
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  render() {
    return renderComponentWithRenderProps(this.props, this.state) as any;
  }
}
