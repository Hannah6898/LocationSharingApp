import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/Validators";
import Button from "../../shared/components/FormElements/Button";

//useReducer to handle the state of validators for the overall form. Updates the inital state based on the actions we recieve
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      //Go through all inputs in the form and check if all inputs are valid
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          //if true+false = false therefore if action.isValid is false it will result in formIsValid being equal to false
          formIsValid = formIsValid && action.isValid;
        } else {
          //Take the stored valuse, the stored validity for this input beacuse it is the input we are not currently updating with this action
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        //Copy exisiting state
        ...state,
        inputs: {
          //copying current input state
          ...state.inputs,
          //dynamic assignment used to change the key inputId to be a new object where the value is action.value and isValid is action.isValid
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

function NewPlace(props) {
  //useReducer - holds inital values for the useReducer
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  //useCallback is used for this function as when triggering these functions via the Input module and if in these
  //function we do anything that changes the state of the new place component and rerenders it. We will the create a new titleInputHandler or descriptionInputHandler
  //function (a new funtion object  will be created if the module rerenders). This means that the function will technically change and be passed to the Input component
  // and the useEffect will run again as the function is a dependency casuing an infinate loop.
  //useCallback wraps a function and define dependencyies on the function for when it should rerender. So if the new place component renrenders no new function object is created but it is stored away by react and reused
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const placeSumbitHandler = event =>{
    event.preventDefault();
    console.log(formState.inputs)// Send to the backend

  }

  return (
    <form className="place-form" onSubmit={placeSumbitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onChange={props}
        element="input"
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onChange={props}
        element="input"
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
       <Input
        id="address"
        type="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        onChange={props}
        element="input"
        errorText="Please enter a valid Address."
        onInput={inputHandler}
      />
      <Button type="submit" disable={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
}

export default NewPlace;
