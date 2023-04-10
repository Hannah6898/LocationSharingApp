import UsersList from "../components/UsersList";

const USERS = [
  {
    id: 1,
    name: "Hannah Osibodu",
    image:
      "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    places: 3,
  },
];

function Users() {
  return <UsersList items={USERS} />;
}

export default Users;
