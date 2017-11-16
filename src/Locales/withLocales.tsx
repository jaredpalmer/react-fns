import * as React from 'react';
import { Locales, LocalesProps } from './Locales';
import { hoistNonReactStatics } from '../hoistStatics';

export function withLocales<Props>(Component: React.ComponentType<Props>) {
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
