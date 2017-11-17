/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Scroll, ScrollProps } from './Scroll';
import { hoistNonReactStatics } from '../hoistStatics';

export function withScroll<Props>(
  Component: React.ComponentType<Props & ScrollProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <Scroll render={(p: ScrollProps) => <Component {...props} {...p} />} />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & ScrollProps>
  ) as React.ComponentType<Props>;
}
