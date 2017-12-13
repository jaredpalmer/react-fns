import * as React from 'react';
import { Vibration, VibrationProps } from './Vibration';
import { hoistNonReactStatics } from '../hoistStatics';

export function withVibration<Props>(
  Component: React.ComponentType<Props & VibrationProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <Vibration
        render={(p: VibrationProps) => <Component {...props} {...p} />}
      />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & VibrationProps>
  ) as React.ComponentType<Props>;
}
