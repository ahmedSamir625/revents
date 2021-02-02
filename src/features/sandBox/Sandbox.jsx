import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
// import { TestPlaceInput } from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";


const Sandbox = () => {
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);
  const [targerBtn, seTtargerBtn] = useState(null);

  const dispatch = useDispatch();
  return (
    <>
      <h1>Testing 123</h1>
      <h2>{`the data is : ${data}`}</h2>

      <Button
        name="increment"
        loading={loading && targerBtn === "increment"}
        content="INCREMENT"
        color="green"
        onClick={(e) => {
          dispatch(increment(20));
          seTtargerBtn(e.target.name);
        }}
      />

      <Button
        name="decrement"
        loading={loading && targerBtn === "decrement"}
        content="DECREMENT"
        color="red"
        onClick={(e) => {
          dispatch(decrement(20));
          seTtargerBtn(e.target.name);
        }}
      />

      <Button
        content="OPEN MODAL"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      />
{/* 
      <div>
        <TestPlaceInput className="ui input" />
      </div> */}
    </>
  );
};

export default Sandbox;
