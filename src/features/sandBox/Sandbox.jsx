import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { decrement, increment } from "./testReducer";

const Sandbox = () => {
  const data = useSelector((state) => state.test.data);

  const dispatch = useDispatch();
  return (
    <>
      <h1>Testing 123</h1>
      <h2>{`the data is : ${data}`}</h2>

      <Button
        content="INCREMENT"
        color="green"
        onClick={() => dispatch(increment(10))}
      />

      <Button
        content="DECREMENT"
        color="red"
        onClick={() => dispatch(decrement(20))}
      />

      <Button
        content="OPEN MODAL"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      />
    </>
  );
};

export default Sandbox;
