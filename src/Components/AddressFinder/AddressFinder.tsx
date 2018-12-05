import * as React from 'react';
import { Form, Button, IFormAPI } from 'Form';
import { cd, getAddress, eventEmitter, eventNames } from 'Services';
import { fieldType } from './types';
import { StageOne, StageTwo, StageThree } from './Fragments';
import { checkErrors } from './checkErrors';

interface IState {
  period: number[];
  postcode: string;
  hasError: boolean;
  addresses: any[];
  address: string[];
}

const initialState = {
  period: [null, null],
  postcode: '',
  hasError: false,
  addresses: [],
  address: [],
};

@cd(() => require('./AddressFinder.scss'))
export class AddressFinder extends React.Component<{}, IState> {
  state = initialState;
  formAPI: IFormAPI;
  addressEdit: any[] = [];

  onFormValuesUpdate = (values) => {
    const period = [
      values[fieldType.YEAR] ? values[fieldType.YEAR] : this.state.period[0],
      values[fieldType.MONTH] ? values[fieldType.MONTH] : this.state.period[1],
    ];

    if(this.state.address.length > 0) {
      values[fieldType.LINE_1] ? this.addressEdit[0] = values[fieldType.LINE_1] : false;
      values[fieldType.LINE_2] ? this.addressEdit[1] = values[fieldType.LINE_2] : false;
      values[fieldType.LINE_3] ? this.addressEdit[2] = values[fieldType.LINE_3] : false;
      values[fieldType.DISTRICT] ? this.addressEdit[4] = values[fieldType.DISTRICT] : false;
      values[fieldType.TOWN] ? this.addressEdit[5] = values[fieldType.TOWN] : false;
      values[fieldType.COUNTRY] ? this.addressEdit[6] = values[fieldType.COUNTRY] : false;
    }

    this.setState({
      period,
      hasError: false,
      postcode: values[fieldType.POSTCODE] !== this.state.postcode ? values[fieldType.POSTCODE] : this.state.postcode,
      address: values[fieldType.ADDRESS] ? values[fieldType.ADDRESS] : this.state.address,
    })
  };

  setError = (error) => {
    this.setState({
      hasError: error.msg,
    });
  };

  onAddressSuccess = (addresses) => {
    this.setState({addresses})
  };

  onAddressError = (error) => {
    this.setError({msg: error});
  };

  sendPostcode = (postcode) => {
    getAddress(postcode).next(this.onAddressSuccess, this.onAddressError)
  };

  confirmData = () => {
    const errors = checkErrors(this.state);
    errors ? this.setError(errors) : this.sendPostcode(this.state.postcode)
  };

  sendData = () => {
    const address = this.state.address.map((address, i) => address !== '' ? address : this.addressEdit[i] || '');
    eventEmitter().dispatch(eventNames.NEW_ADDRESS, {
      address,
      period: this.state.period,
    });
    this.clear();
  };

  getFormAPI = (formAPI: IFormAPI) => {
    this.formAPI = formAPI;
  };

  clear = () => {
    this.setState(initialState);
    this.formAPI.clearValue();
  };

  render(c?) {
    const { addresses, hasError, address } = this.state;

    return (
      <section className={c('container')}>
        <p className={c(`error ${hasError ? 'view' : ''}`)}>{hasError}</p>
        <Form onValuesUpdate={this.onFormValuesUpdate} getAPI={this.getFormAPI}>
          <StageOne/>

          <StageTwo addresses={addresses}/>
          
          <StageThree address={address}/>

          <Button onClick={address.length > 0? this.sendData : this.confirmData}>Confirm and continue</Button>
        </Form>
      </section>
    );
  }
}