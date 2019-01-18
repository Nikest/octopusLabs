import * as React from 'react';
import { sl } from 'Services/Styles';

export const Logo = function () {
  const c = sl(() => require('./Logo.scss'));

  return (
    <div className={c('container')}>
      <div className={c('logo')}/>
    </div>
  )
};
