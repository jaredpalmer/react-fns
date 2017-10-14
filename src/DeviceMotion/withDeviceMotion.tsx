import * as React from 'react';
import { DeviceMotion, DeviceMotionProps } from './DeviceMotion';
import { hoistNonReactStatics } from '../hoistStatics';

export function withDeviceMotion<Props>(Component: React.ComponentType<Props>) {
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
