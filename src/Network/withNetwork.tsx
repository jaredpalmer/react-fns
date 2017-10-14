import * as React from 'react';
import { Network, NetworkProps } from './Network';
import { hoistNonReactStatics } from '../hoistStatics';

export function withNetwork<Props>(Component: React.ComponentType<Props>) {
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
