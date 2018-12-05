import * as React from 'react';
import { eventEmitter, eventNames } from 'Services';

export interface IOutputProps {
  onValuesUpdate?: Function;
}

export abstract class OutputBase<P extends IOutputProps, S> extends React.Component<P, S> {
  outputElem: any = React.createRef();
  values = {};
  inputs = {};

  onInputChange = (event: CustomEvent) => {
    this.values[event.detail.name] = event.detail.value;
    this.inputs[event.detail.name] = event.target;
    this.update();
  };

  update = () => {
    this.forceUpdate();
    this.props.onValuesUpdate && this.props.onValuesUpdate(this.values);
  };

  clearValues = () => {
    this.values = {};
    Object.keys(this.inputs).forEach(name => {
      this.inputs[name].inputBaseAPI.clearValue();
    })
  };

  componentDidMount() {
    eventEmitter().htmlSubscribe(this.outputElem.current, eventNames.INPUT_CHANGE, this.onInputChange)
  }
}