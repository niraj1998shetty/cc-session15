
import React from "react";

type InputWithLabelProps={
  value: string;
    id: string;
    children?: React.ReactNode;
    type?: string;
    onInputChange:  (event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const InputWithLabel = ({ value, id, children, type, onInputChange }:InputWithLabelProps) => {
  return (
    <>
      <label htmlFor={id}> </label>
      <input style={{
      display:"block",
      padding:"0.5rem",
      border:"none",
      outline:"none",
      borderRadius:"3px",
      margin:"10px 0px"
    }}
      type={type} id={id} value={value} onChange={onInputChange}></input>
    </>
  );
};
export default InputWithLabel;
