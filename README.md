 react-fns

Modern React components, hoc's, and utilities functions. 

*react-fns* is your React utility belt. It's a collection of declarative components and higher-order components for lots of common situations.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [Higher Order Components / Render Props](#higher-order-components--render-props)
  - [DeviceMotion](#devicemotion)    
  - [DeviceOrientation](#deviceorientation)
  - [Network](#network)
  - [Scroll](#scroll)
- [Utility Components](#utility-components)
  - [`<Mailto />`](#mailto-)  
  - [`<Sms />`](#sms-)
  

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API Reference

## Higher Order Components / Render Props

When possible, each component (e.g. `<Thing/>`) in react-fns also exports a higher-order component with identical functionality (e.g. `withThing()`.

Every render prop'd component shares the same three rendering methods:

- `<Thing render={props => <Inner />}>`
- `<Thing component={Inner}>`
- `<Thing>{props => <Inner />}</Thing>>`

All HoC's pass will through any and all additional props through to the inner component in addition to the props that they inject.


### DeviceMotion

Detect and retrieve current device Motion.

#### DeviceMotion props

 - `acceleration: DeviceMotionEvent.acceleration`
 - `accelerationIncludingGravity: DeviceMotionEvent.accelerationIncludingGravity`
 - `rotationRate: DeviceMotionEvent.rotationRate`
 - `interval: DeviceMotionEvent.interval`

For more information about the DeviceMotion API, [check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion)

#### `<DeviceMotion render/>`

```js
import { DeviceMotion } from 'react-fns'

const Example = () =>
  <DeviceMotion 
    render={({ alpha, beta, gamma, absolute }) => 
     <pre>
      {JSON.stringify({alpha, beta, gamma}, null, 2)}
     </pre>
    } 
  />

export default Example
```

#### `withDeviceMotion()`

```js
import { withDeviceMotion } from 'react-fns'

const Inner = ({ alpha, beta, gamma, absolute }) => 
  <pre>
    {JSON.stringify({alpha, beta, gamma}, null, 2)}
  </pre>

export default withDeviceMotion(Inner)
```

### DeviceOrientation

Detect and retrieve current device orientation.

#### DeviceOrientation props

- `alpha: number`:  value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360.
- `betaa: number`: value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device.
- `gamma: number`:  value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.

For more information about the DeviceOrientation API, [check out the MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)

#### `<DeviceOrientation render/>`

```js
import { DeviceOrientation } from 'react-fns'

const Example = () =>
  <DeviceOrientation 
    render={({ alpha, beta, gamma, absolute }) => 
     <pre>
      {JSON.stringify({alpha, beta, gamma}, null, 2)}
     </pre>
    } 
  />

export default Example
```

#### `withDeviceOrientation()`

```js
import { withDeviceOrientation } from 'react-fns'

const Inner = ({ alpha, beta, gamma, absolute }) => 
  <pre>
    {JSON.stringify({alpha, beta, gamma}, null, 2)}
  </pre>

export default withDeviceOrientation(Inner)
```

### Network

Retrieve network access from the browser.

#### Network props

- `online: boolean`: `true` if the browser has network access. `false` otherwise.
- `offlineAt?: Date`: Date when network connection was lost.

#### `<Network render/>`

```js
import { Network } from 'react-fns'

const Example = () =>
  <Network 
    render={({ online, offlineAt }) => 
     <div>
        {online ? 'Online!' : 'Offline'}
        {offlineAt && `Last connected ${offlineAt.toISOString()}`}
     </div>
    } 
  />

export default Example
```

#### `withNetwork()`

```js
import { withNetwork } from 'react-fns'

const Inner = ({ online, offlineAt }) => 
  <div>
    {online ? 'Online!' : 'Offline'}
    {offlineAt && `Last connected ${offlineAt.toISOString()}`}
  </div>

export default withNetwork(Inner)
```

### Scroll

#### Scroll props

- `x`: Horizontal scroll in pixels (`window.scrollX`)
- `y`: Vertical scroll in pixels (`window.scrollX`)

#### `<Scroll render/>`

Returns `window.scrollY` and `window.scrollX`.

```js
import { Scroll } from 'react-fns'

const Example = () =>
  <Scroll 
    render={({ x, y }) => 
     <div>Scroll: {x}, {y}</div>
    } 
  />

export default Example
```

#### `withScroll()`

Injects `window.scrollY` and `window.scrollX` as `x` and `y` props.

```js
import { withScroll } from 'react-fns'

const Inner = ({ x, y }) => <div>Scroll Position: {x}, {y}</div>

export default withScroll(Inner)
```

## Utility Components

### `<Mailto />`

Renders `<a href="mailto:..." />`

#### Mailto props

- `email: string`: Recipient's email address
- `subject?: string`: Subject of the email
- `cc?: string | string[]`: Email address or an array of email addresses to Cc
- `bcc?: string | string[]`: Email address or an array of email addresses to Bcc (blind copy)
- `body?: string`: Body copy of the email

### `<Sms />`

Renders `<a href="sms:..." />`

#### Sms props

- `phone: string`: Phone number
- `body?: string`: Body copy of the text message

# Todo

- [ ] `<Viewport />`
- [ ] `<Geo/>`
- [ ] `<Request />`
- [ ] `<Toggle />`
- [ ] `<Truncate />`
- Add warnings
- Consider a factory for Web API's

# Author

- Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)
