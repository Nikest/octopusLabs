import * as React from 'react';
import { InputBase, IInputState } from './Base';
import { cd } from 'Services';

export interface IOption {
  text: string;
  value: any;
}

interface IProps {
  options: IOption[];
  className?: string;
  placeholder: string;
  name: string;
  setValue?: any;
  onChange?: Function;
}

interface IState extends IInputState{
  isOpen: boolean;
  textValue: string;
}

@cd(() => require('./Form.scss'))
export class Select extends InputBase<IProps, IState> {
  state = {
    isOpen: false,
    textValue: '',
    valueState: null,
  };

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    },this.clickWatch);
  };

  clickWatch = () => {
    const { isOpen } = this.state;
    isOpen && document.addEventListener('click', this.toggleOpen);
    !isOpen && document.removeEventListener('click', this.toggleOpen);
  }

  setvalue = (text, value) => {
    this.setState({
      textValue: text,
      valueState: value,
    }, () => {
      this.clickWatch();
      this.onChange(value);
    });
  };

  render(c?) {
    const { options, className, placeholder } = this.props;
    const { isOpen, textValue, valueState } = this.state;

    const elem = this.inputElem.current;
    let openRule = '';

    if(elem) {
      const rect = elem.getBoundingClientRect();
      const bottomView = window.innerHeight - rect.bottom;
      openRule += bottomView < 200 ? 'top' : '';
    }

    const optionClass = `options ${isOpen ? 'open' : ''} ${openRule}`;

    return (
      <div ref={this.inputElem} className={c(`select input ${className || ''}`)} onClick={this.toggleOpen}>
        <p>{valueState ? textValue : placeholder}</p>

        <div className={c(optionClass)}>
          {
            options.map((data: IOption, i) => {
              return <div key={i} className={c('option')} onClick={() => {
                this.setvalue(data.text, data.value)
              }}>{data.text}</div>
            })
          }
        </div>
      </div>
    )
  }
}
