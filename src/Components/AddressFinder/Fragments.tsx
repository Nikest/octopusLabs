import * as React from 'react';
import {
  Select,
  Label,
  Input
} from 'Form';
import { years, months } from './values';
import { fieldType } from './types';
import { sl } from 'Services';

interface IPropsOne {

}

interface IPropsTwo {
  addresses: any[];
}

interface IPropsThree {
  address: any[];
}

const c = sl(() => require('./AddressFinder.scss'));

export const StageOne = (props: IPropsOne) => {
  return (
    <React.Fragment>
      <p className={c('field-text small-size')}>How long did you state at your <b>current address</b>?</p>
      <div className={c('small-wrap row')}>
        <Label className={c('each-cell')}>
          <Select name={fieldType.YEAR} options={years} placeholder={'Select years'}/>
        </Label>
        <Label className={c('each-cell')}>
          <Select name={fieldType.MONTH} options={months} placeholder={'Select months'}/>
        </Label>
      </div>

      <p className={c('field-text small-size')}>Your address:</p>
      <div className={c('small-wrap row')}>
        <Label className={c('full-cell')}>
          <Input name={fieldType.POSTCODE} placeholder={'Type a postcode'}/>
        </Label>
      </div>
    </React.Fragment>
  )
};

export const StageTwo = (props: IPropsTwo) => {
  if(props.addresses.length > 0) {
    const option = props.addresses.map((data) => {
      return {
        text: data.filter(d => d !== '').join(', '),
        value: data,
      }
    });

    return (
      <React.Fragment>
        <p className={c('field-text small-wrap')}>Select your address:</p>
        <div className={c('small-wrap row')}>
          <Label className={c('full-cell')}>
            <Select name={fieldType.ADDRESS} options={option} placeholder={'Select address'}/>
          </Label>
        </div>
      </React.Fragment>
    )
  }

  return null
};

export const StageThree = (props: IPropsThree) => {
  if(props.address.length > 0) {
    return (
      <React.Fragment>
        <div className={c('big-wrap row')}>
          <div className={c('each-cell')}>
            <p className={c('field-text')}>Addres Line 1:</p>
            <Label><Input name={fieldType.LINE_1} value={props.address[0]} disabled={props.address[0] !== ''}/></Label>
          </div>

          <div className={c('each-cell')}>
            <p className={c('field-text')}>District:</p>
            <Label><Input name={fieldType.DISTRICT} value={props.address[4]} disabled={props.address[4] !== ''}/></Label>
          </div>
        </div>

        <div className={c('big-wrap row')}>
          <div className={c('each-cell')}>
            <p className={c('field-text')}>Addres Line 2:</p>
            <Label><Input name={fieldType.LINE_2} value={props.address[1]} disabled={props.address[1] !== ''}/></Label>
          </div>

          <div className={c('each-cell')}>
            <p className={c('field-text')}>Town:</p>
            <Label><Input name={fieldType.TOWN} value={props.address[5]} disabled={props.address[5] !== ''}/></Label>
          </div>
        </div>

        <div className={c('big-wrap row')}>
          <div className={c('each-cell')}>
            <p className={c('field-text')}>Addres Line 3:</p>
            <Label><Input name={fieldType.LINE_3} value={props.address[2]} disabled={props.address[2] !== ''}/></Label>
          </div>

          <div className={c('each-cell')}>
            <p className={c('field-text')}>Country:</p>
            <Label><Input name={fieldType.COUNTRY} value={props.address[6]} disabled={props.address[6] !== ''}/></Label>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return null
};
