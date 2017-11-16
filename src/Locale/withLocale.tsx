import * as React from 'react';
import { Locale, LocaleProps } from './Locale';
import { hoistNonReactStatics } from '../hoistStatics';

export function withLocale<Props>(Component: React.ComponentType<Props>) {
  const S: React.SFC<Props> = props => {
    return (
      <Locale render={(p: LocaleProps) => <Component {...props} {...p} />} />
    );
  };

  return hoistNonReactStatics<Props>(
    S as any,
    Component as React.ComponentClass<Props & LocaleProps>
  ) as React.ComponentType<Props>;
}
