/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Locales, LocalesProps } from './Locales';
import { hoistNonReactStatics } from '../hoistStatics';

export function withLocales<Props>(
  Component: React.ComponentType<Props & LocalesProps>
) {
  const S: React.SFC<Props> = props => {
    return (
      <Locales render={(p: LocalesProps) => <Component {...props} {...p} />} />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & LocalesProps>
  ) as React.ComponentType<Props>;
}
