import * as React from 'react';
import { OutputBase, IOutputProps } from 'Form/Base';

interface IProps extends IOutputProps {
  className?: string;
  onForm?: Function;
  children: any;
  getAPI?: Function;
}

export interface IFormAPI {
  clearValue: Function;
  setError: Function;
}

export class Form extends OutputBase<IProps, {}> {
  render() {
    const { className, children } = this.props;
    return (
      <form ref={this.outputElem} className={className || ''} onSubmitCapture={e => e.preventDefault()}>
        { children }
      </form>
    )
  }

  componentWillUpdate() {
    this.props.getAPI && this.props.getAPI({clearValue: this.clearValues})
  }
}