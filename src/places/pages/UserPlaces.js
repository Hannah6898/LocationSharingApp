import PlaceList from "../components/PlaceList";
import {useParams} from 'react-router-dom'

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "this famous building",
    image: "https://images.unsplash.com/photo-1508094214466-708a7d21c5c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1761&q=80",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
        lng: 150.644,
        lat: -34.397
    },
    creator:"u1"
  },
  {
    id: "p2",
    title: "Theee Empire State Building",
    description: "this",
    image: "https://images.unsplash.com/photo-1508094214466-708a7d21c5c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1761&q=80",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lng: 150.644,
      lat: -34.397
    },
    creator:"u2"
  },
];

function UserPlaces() {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
