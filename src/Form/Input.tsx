import * as React from 'react';
import { InputBase, IInputState } from './Base';
import { cd } from 'Services';

interface IProps {
  name: string;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
}

interface IState extends IInputState {

}

@cd(() => require('./Form.scss'))
export class Input extends InputBase<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      valueState: this.props.value || undefined,
    };
  }

  render(c?) {
    const { name, placeholder, disabled, value } = this.props;
    const { valueState } = this.state;

    return (
      <input
        ref={this.inputElem}
        className={c('input')}
        type="text"
        name={name}
        value={value || undefined}
        onInput={this.onInput}
        placeholder={placeholder || ''}
        disabled={disabled}/>
    )
  }
}
