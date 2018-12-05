import * as React from 'react';
import { sl } from 'Services';

interface IProps {
  address: string;
  period: string;
}

export const AddressView = function (props: IProps) {
  const c = sl(() => require('./AddressView.scss'));
  const { address, period } = props;
  return (
    <address className={c('container')}>
      <p>{address}</p>
      <p>Time at address: {period}</p>
    </address>
  );
};