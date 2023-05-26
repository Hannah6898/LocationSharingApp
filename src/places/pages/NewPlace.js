import Input from "../../shared/components/FormElements/Input";
import "./PlaceForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/Validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

function NewPlace(props) {
  const [formState, inputHandler ]= useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const placeSumbitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Send to the backend
  };

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
