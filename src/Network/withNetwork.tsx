/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Network, NetworkProps } from './Network';
import { hoistNonReactStatics } from '../hoistStatics';

export function withNetwork<Props>(
  Component: React.ComponentType<Props & NetworkProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <Network render={(p: NetworkProps) => <Component {...props} {...p} />} />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & NetworkProps>
  ) as React.ComponentType<Props>;
}
