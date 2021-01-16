import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StyledIcon, StyledTd, StyledTr } from '../../../common';
import { Theme } from '../../../../style/Theme';

const I = styled(StyledIcon)`
  background: #f7f7f7;

  &:hover {
    background-color: ${Theme.secondary};
  }
`;
const StepsTd = styled(StyledTd)``;
const StepsTr = styled(StyledTr)``;

const StepsTableRow = ({
  idx,
  stepsTableRow,
  setShowModalStep,
  removeStep,
}) => {
  const {
    id,
    app_id,
    date,
    step_type,
    contact_name,
    contact_role,
    contact_info,
    notes,
  } = stepsTableRow;

  return (
    <StepsTr>
      <StepsTd>{new Date(date).toLocaleDateString('en-US')}</StepsTd>
      <StepsTd>{step_type}</StepsTd>
      <StepsTd>{contact_name}</StepsTd>
      <StepsTd>{contact_role}</StepsTd>
      <StepsTd>
        <a
          href={`mailto:${contact_info}`}
          data-toggle="tooltip"
          title="Send me Email!"
          style={{ color: 'black' }}
        >
          {contact_info}
        </a>
      </StepsTd>
      <StepsTd>{notes}</StepsTd>
      <StepsTd>
        <I onClick={() => setShowModalStep({ action: 'edit', id: idx })}>
          <FontAwesomeIcon icon={faPen} />
        </I>
        <I onClick={() => removeStep(app_id, id)}>
          <FontAwesomeIcon icon={faTrash} />
        </I>
      </StepsTd>
    </StepsTr>
  );
};

export default StepsTableRow;
