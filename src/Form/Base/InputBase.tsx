import * as React from 'react';
import { eventEmitter, eventNames } from 'Services';

export interface IInputState {
  valueState: any;
}

export class InputBase<P, S extends IInputState> extends React.Component<P, S> {
  inputElem: any = React.createRef();
  timer;

  onChange = (value) => {
    this.setState({valueState: value});
    this.emit(value);
  };

  onInput = (e) => {
    clearTimeout(this.timer);
    setTimeout((val) => {
      this.onChange(val);
    }, 100, e.target.value);

  };

  clearValue = () => {
    this.setState({
      valueState: this.props['value'] || undefined
    }, () => this.inputElem.current.value = null)
  };

  emit = (value) => {
    eventEmitter().htmlEvent(eventNames.INPUT_CHANGE, {
      value,
      name: this.props['name']
    }).emitFrom(this.inputElem.current)
  };

  componentDidMount() {
    this.inputElem.current.inputBaseAPI = {
      clearValue: this.clearValue,
    };
    this.emit(null);
  }
}