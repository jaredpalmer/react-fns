/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { SharedRenderProps } from '../types';
import { renderComponentWithRenderProps } from '../utils';

export interface DeviceMotionProps {
  acceleration: DeviceAcceleration;
  accelerationIncludingGravity: DeviceAcceleration;
  rotationRate: DeviceRotationRate;
  interval: number;
}

export class DeviceMotion extends React.Component<
  SharedRenderProps<DeviceMotionProps>,
  DeviceMotionProps
> {
  state: DeviceMotionProps = {
    acceleration: {
      x: null,
      y: null,
      z: null,
    },
    accelerationIncludingGravity: {
      x: null,
      y: null,
      z: null,
    },
    rotationRate: {
      alpha: null,
      beta: null,
      gamma: null,
    },
    interval: 0,
  };

  handleDeviceMotion = (e: DeviceMotionEvent) => {
    this.setState({
      acceleration: e.acceleration,
      accelerationIncludingGravity: e.accelerationIncludingGravity,
      rotationRate: e.rotationRate,
      interval: e.interval,
    });
  };

  componentDidMount() {
    window.addEventListener('deviceMotion', this.handleDeviceMotion, true);
  }

  componentWillUnmount() {
    window.removeEventListener('deviceMotion', this.handleDeviceMotion);
  }

  render() {
    return renderComponentWithRenderProps(this.props, this.state) as any;
  }
}
