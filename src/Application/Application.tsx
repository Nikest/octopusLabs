import * as React from 'react';

import { ErrorHandler } from './ErrorHandler';
import { Context } from './Context';
import { Core } from 'Core';

export class Application extends React.Component {
  render() {
    return (
      <ErrorHandler>
        <Context>
          <Core/>
        </Context>
      </ErrorHandler>
    )
  }
}