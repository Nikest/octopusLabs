import * as React from 'react';
import { cd } from 'Services';

interface IProps {
  children: any;
  onClick: Function;
  className?: string;
}

@cd(() => require('./Form.scss'))
export class Button extends React.Component<IProps> {
  render(c?) {
    const { children, className, onClick } = this.props;

    return (
      <button className={c(`button ${className || ''}`)} onClick={() => onClick()}>{children}</button>
    )
  }
}