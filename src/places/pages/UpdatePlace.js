import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/Validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "this famous building",
    image:
      "https://images.unsplash.com/photo-1508094214466-708a7d21c5c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1761&q=80",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lng: 150.644,
      lat: -34.397,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "this",
    image:
      "https://images.unsplash.com/photo-1508094214466-708a7d21c5c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1761&q=80",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lng: 150.644,
      lat: -34.397,
    },
    creator: "u2",
  },
];

function UpdatePlace() {
  const placeId = useParams().placeId;

  //Method checks that the place id in the URL is also present in the place information we have in the database
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
 

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true,
      },
      description: {
        value: identifiedPlace.description,
        isValid: true,
      },
    },
  true
  );

   //If the place id in the URL is not present in the database return a message
   if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  const placeSumbitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Send to the backend
  };

  return (
    <form className="place-form" onSubmit={placeSumbitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initalValue={formState.inputs.title.value}
        initalIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)"
        onInput={inputHandler}
        initalValue={formState.inputs.description.value}
        initalIsValid={formState.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default UpdatePlace;
