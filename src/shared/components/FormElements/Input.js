import "./Input.css";
import React, { useReducer, useEffect } from "react";
import { validate } from "../../Utils/Validators";

//useReducer to handle the state of the validators for the Inputs
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

function Input(props) {
  //useReducer - holds inital values for the useReducer
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initalvalue || "",
    isValid: props.initalIsValid || false,
    isTouched: false,
  });

  //Destructuing props to access certain values required from props for useEffect.
  //Using props alone as a dependency in useEffect could lead to an infinate loop/ execute too often
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  //useEffect upon change of dependencies the onInput method will be called
  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //A function that handles change within the input. This method with the aid of useReducer validates the input this function is attached to
  //dispatch = action which is passed to inputReducer
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        initialvalue={props.initialvalue}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        initialvalue={props.initialvalue}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
