import { useCallback, useReducer } from "react";

//useReducer to handle the state of validators for the overall form. Updates the inital state based on the actions we receive
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      //Go through all inputs in the form and check if all inputs are valid
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          //if true+false = false therefore if action.isValid is false it will result in formIsValid being equal to false
          formIsValid = formIsValid && action.isValid;
        } else {
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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initalInputs, initalFormValidity) => {
  //useReducer - holds inital values for the useReducer
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initalInputs,
    isValid: initalFormValidity,
  });

  //useCallback is used for this function as when we trigger these functions via the Input module and then if in this
  //function we do anything that changes the state of the new place component and rerenders it. We will the create a new titleInputHandler or descriptionInputHandler
  //function (a new funtion object will be created if the module rerenders). This means that the function will technically change and be passed to the Input component
  // and the useEffect will run again as the function is a dependency casuing an infinate loop.
  //useCallback wraps a function and defines dependencies on the function for when it should rerender. So if the new place component rerenders no new function object is created but it is stored away by react and reused
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  //Allows us to replace the values and validity stored in the form with data from the backend
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
