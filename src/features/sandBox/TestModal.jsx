import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";



const TestModal = ({ data }) => {
  return (
    <ModalWrapper size="mini" header="Test Modal">
      <div>THE DATA IS :{data}</div>
    </ModalWrapper>
  );
};

export default TestModal;
