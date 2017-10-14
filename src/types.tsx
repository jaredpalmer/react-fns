import * as React from 'react';

export interface SharedRenderProps<P> {
  debug?: boolean;
  component?: React.ComponentType<P | void>;
  render?: ((props: P) => React.ReactNode);
  children?: ((props: P) => React.ReactNode) | React.ReactNode;
}

export type CompositeComponent<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;

export interface ComponentDecorator<TOwnProps, TMergedProps> {
  (component: CompositeComponent<TMergedProps>): React.ComponentClass<
    TOwnProps
  >;
}

export interface InferableComponentDecorator<TOwnProps> {
  <T extends CompositeComponent<TOwnProps>>(component: T): T;
}
