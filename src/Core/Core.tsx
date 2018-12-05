import * as React from 'react';
import { cd } from 'Services';
import { Logo, Header, MainContent } from 'Components';

@cd(() => require('./Core.scss'))
export class Core extends React.Component {
  render(c?) {
    return (
      <div className={c('container')}>
        <Logo/>

        <section className={c('content')}>
          <Header/>
          <MainContent/>
        </section>
      </div>
    )
  }
}

