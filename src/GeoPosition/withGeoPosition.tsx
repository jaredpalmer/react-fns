/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { GeoPosition, GeoPositionProps } from './GeoPosition';
import { hoistNonReactStatics } from '../hoistStatics';

export function withGeoPosition<Props>(
  Component: React.ComponentType<Props & GeoPositionProps>
) {
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
