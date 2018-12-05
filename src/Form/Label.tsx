import * as React from 'react';
import { cd, eventEmitter, eventNames } from 'Services';

interface IProps {
  children: any;
  className?: string;
}

interface IState {
  hasError: boolean | string;
}

@cd(() => require('./Form.scss'))
export class Label extends React.Component<IProps> {
  state = {
    hasError: false
  };

  label: any = React.createRef();

  render(c?) {
    const { children, className } = this.props;
    const classList = `label ${this.state.hasError ? 'error' : ''} ${className || ''}`;
    return (
      <label ref={this.label} className={c(classList)}>{children}</label>
    )
  }

  componentDidMount() {
    eventEmitter().htmlSubscribe(this.label.current, eventNames.INPUT_ERROR, (data) => {
      this.setState({
        hasError: data.value,
      });
    })
  }
}

