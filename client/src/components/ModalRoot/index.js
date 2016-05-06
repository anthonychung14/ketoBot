import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalStaplePlan from 'components/ModalStaplePlan'

const MODAL_COMPONENTS = {
  'ADD_STAPLE_PLAN': ModalStaplePlan
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(state => state.modal)(Modal)