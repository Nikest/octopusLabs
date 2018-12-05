import * as React from 'react';
import { AddressView } from './AddressView';
import { eventEmitter, eventNames, cd } from 'Services';
import { addressType } from './type';
import { dataProcess } from './dataProsess';

interface IState {
  addresses: addressType[];
}

@cd(() => require('./AddressView.scss'))
export class AddressGroup extends React.Component<{}, IState> {
  state = {
    addresses: [],
  };

  render(c?) {
    const { addresses } = this.state;

    return (
      <article className={addresses.length > 0 ? c('wrap') : ''}>
        {addresses.map((data, i) => <AddressView key={i} address={data.address} period={data.period}/>) }
      </article>
    )
  }

  componentDidMount() {
    eventEmitter().on(eventNames.NEW_ADDRESS, (data) => {
      this.state.addresses.push(dataProcess(data));
      this.forceUpdate();
    })
  }
}