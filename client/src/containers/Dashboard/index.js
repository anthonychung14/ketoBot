import React, { Component } from 'react';

/* components */
import UserForm from 'components/UserForm';
import UserData from 'components/UserData';
import WizardForm from 'components/UserForm/wizardForm';
        
import { styles } from './styles.scss';


export class Dashboard extends Component {
  constructor(props){
    super(props);    
  }

  render() {
    return (
      <section className={`${styles}`}>        
        <UserData />
        <WizardForm />
      </section>
    );
  }
}
