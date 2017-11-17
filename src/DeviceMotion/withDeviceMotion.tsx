/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { DeviceMotion, DeviceMotionProps } from './DeviceMotion';
import { hoistNonReactStatics } from '../hoistStatics';

export function withDeviceMotion<Props>(
  Component: React.ComponentType<Props & DeviceMotionProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <DeviceMotion
        render={(p: DeviceMotionProps) => <Component {...props} {...p} />}
      />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & DeviceMotionProps>
  ) as React.ComponentType<Props>;
}
