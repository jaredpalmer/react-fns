import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Vibration } from '../Vibration';
import * as renderer from 'react-test-renderer';

describe('<Vibration />', () => {
  describe('<Vibration render />', () => {
    const node = document.createElement('div');

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(node);
    });

    it('receives { vibrate, persistentVibrate, cancelVibrate } props', () => {
      ReactDOM.render(
        <Vibration
          render={vibrationProps => {
            expect(vibrationProps.vibrate).toBeInstanceOf(Function);
            expect(vibrationProps.persistentVibrate).toBeInstanceOf(Function);
            expect(vibrationProps.cancelVibrations).toBeInstanceOf(Function);
            return null;
          }}
        />,
        node
      );
    });

    it('calls base vibrate function', () => {
      // Render a <Vibration /> and save the passed functions in 'vibrationFunctions'
      let vibrationFunctions;
      const VibrationComponent = renderer.create(
        <Vibration
          render={vibrationProps => {
            vibrationFunctions = vibrationProps;
            return null;
          }}
        />
      );

      // Mock the base handleVibrate function
      const mockVibrateFunction = jest.fn();
      (VibrationComponent.getInstance() as any).handleVibrate = mockVibrateFunction;

      vibrationFunctions.vibrate(10);
      expect(mockVibrateFunction).toHaveBeenLastCalledWith(10);

      vibrationFunctions.persistentVibrate(200, 100);
      expect(mockVibrateFunction).toHaveBeenLastCalledWith(200);

      vibrationFunctions.cancelVibrations();
      expect(mockVibrateFunction).toHaveBeenLastCalledWith(0);
    });
  });
});
