import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import Assignment from '@mui/icons-material/Assignment';
import AssignmentLate from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';

import { toggleMode } from '~/features/ui/actions';

import { hasValidationMessages } from './selectors';

const ToggleValidationModeButton = ({
  onToggleValidationMode,
  trajectoriesValid,
  validationInProgress,
  ...rest
}) => (
  <IconButton
    disableRipple
    onClick={onToggleValidationMode}
    {...rest}
    size='large'
  >
    {validationInProgress ? (
      <Assignment />
    ) : trajectoriesValid ? (
      <AssignmentTurnedIn />
    ) : (
      <AssignmentLate />
    )}
  </IconButton>
);

ToggleValidationModeButton.propTypes = {
  onToggleValidationMode: PropTypes.func,
  trajectoriesValid: PropTypes.bool,
  validationInProgress: PropTypes.bool,
};

export default connect(
  // mapStateToProps
  (state) => ({
    trajectoriesValid: !hasValidationMessages(state),
  }),
  // mapDispatchToProps
  {
    onToggleValidationMode: () => toggleMode('validation'),
  }
)(ToggleValidationModeButton);
