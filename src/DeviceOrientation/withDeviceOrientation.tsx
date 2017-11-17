/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { DeviceOrientation, DeviceOrientationProps } from './DeviceOrientation';
import { hoistNonReactStatics } from '../hoistStatics';

export function withDeviceOrientation<Props>(
  Component: React.ComponentType<Props & DeviceOrientationProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <DeviceOrientation
        render={(p: DeviceOrientationProps) => <Component {...props} {...p} />}
      />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & DeviceOrientationProps>
  ) as React.ComponentType<Props>;
}
