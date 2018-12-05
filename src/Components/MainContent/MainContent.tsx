import * as React from 'react';
import { cd } from 'Services';
import {
  AddressGroup,
  AddressFinder,
} from 'Components';


@cd(() => require('./MainContent.scss'))
export class MainContent extends React.Component {
  render(c?) {
    return (
      <main className={c('container')} onClick={this['testData']}>
        <AddressGroup/>
        <AddressFinder/>
      </main>
    )
  }
}