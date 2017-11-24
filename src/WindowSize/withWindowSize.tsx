/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { WindowSize, WindowSizeProps } from './WindowSize';
import { hoistNonReactStatics } from '../hoistStatics';

export function withWindowSize<Props>(
  Component: React.ComponentType<Props & WindowSizeProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <WindowSize
        render={(p: WindowSizeProps) => <Component {...props} {...p} />}
      />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & WindowSizeProps>
  ) as React.ComponentType<Props>;
}
