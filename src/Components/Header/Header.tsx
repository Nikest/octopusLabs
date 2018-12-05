import * as React from 'react';
import { sl } from '../../Services/Styles';

export const Header = function () {
  const c = sl(() => require('./Header.scss'));

  return (
    <header className={c('container')}>
      <div className={c('wrap')}>
        <h1 className={c('title')}>Home address</h1>
        <p>Please enter the director's home address for the last 3 years</p>
      </div>
    </header>
  )

};