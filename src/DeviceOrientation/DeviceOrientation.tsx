/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from '../utils';

export interface DeviceOrientationProps {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean;
}

export class DeviceOrientation extends React.Component<
  SharedRenderProps<DeviceOrientationProps>,
  DeviceOrientationProps
> {
  state: DeviceOrientationProps = {
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
  };

  handleDeviceOrientation = (e: DeviceOrientationEvent) => {
    this.setState({
      beta: e.beta,
      alpha: e.alpha,
      gamma: e.gamma,
      absolute: e.absolute,
    });
  };

  componentDidMount() {
    window.addEventListener(
      'deviceorientation',
      this.handleDeviceOrientation,
      true
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'deviceorientation',
      this.handleDeviceOrientation
    );
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
