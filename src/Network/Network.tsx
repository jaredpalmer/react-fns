/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from '../utils';

export interface NetworkProps {
  online: boolean;
  offlineAt?: Date;
}

export class Network extends React.Component<
  SharedRenderProps<NetworkProps>,
  NetworkProps
> {
  state: NetworkProps = { online: navigator.onLine };

  handleOnline = () => {
    this.setState({ online: true, offlineAt: undefined });
  };

  handleOffline = () => {
    this.setState({ online: false, offlineAt: new Date() });
  };

  componentDidMount() {
    if (typeof window !== 'undefined' && navigator) {
      this.setState({ online: navigator.onLine });
    }

    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
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
