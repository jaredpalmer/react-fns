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
import { supportsPassiveListener } from '../utils/featureDetection';

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
  static defaultProps: Partial<ScrollConfig> = {
    throttle: 100,
  };

  state: ScrollProps = { x: 0, y: 0 };

  handleWindowScroll = throttle(() => {
    this.setState({ x: window.scrollX, y: window.scrollY });
  }, this.props.throttle!);

  componentDidMount() {
    this.handleWindowScroll();
    (window as EventTarget).addEventListener(
      'scroll',
      this.handleWindowScroll,
      supportsPassiveListener ? { passive: true } : false
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
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
