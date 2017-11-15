import * as React from 'react';
import { GeoPosition, GeoPositionProps } from './GeoPosition';
import { hoistNonReactStatics } from '../hoistStatics';

export function withGeoPosition<Props>(Component: React.ComponentType<Props>) {
  const S: React.SFC<Props> = props => {
    return (
      <GeoPosition
        render={(p: GeoPositionProps) => <Component {...props} {...p} />}
      />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & GeoPositionProps>
  ) as React.ComponentType<Props>;
}
