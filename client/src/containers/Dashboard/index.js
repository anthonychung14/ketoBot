import React, { Component } from 'react';

/* components */
import UserForm from 'components/UserForm';
import WizardForm from 'components/UserForm/wizardForm';
        
import { styles } from './styles.scss';


export class Dashboard extends Component {
  constructor(props){
    super(props);    
  }

  render() {
    return (
      <section className={`${styles}`}>        
        <WizardForm />
      </section>
    );
  }
}
