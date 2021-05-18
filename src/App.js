import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

// URL in a variable
const url ="https://localhost:4000"

//State to hold places
const [places, setPlaces] = React.useState([])

//Empty Place - For the Create Form 
const emptyPlace =   {
  name: "",
  img: "",
  description: ""
}

//new state to track selected Place for edit form 
const [selectedPlace, setSelectedPlace] = React.useState(emptyPlace)

///Function to get list of Places
const getPlaces = ()=>{
  //make a get request
  fetch(url +'/places/')
  //use .then to take action when the response comes in
  //convert data into js object
  .then((response)=>response.json())
  //use the data from the response
  .then((data)=>{
    setPlaces(data)
  })
}

// useEffect, to get the data right away
React.useEffect(()=>{
  getPlaces()
},[])

//handleCreate - function for when ceate form is submitted
const handleCreate = (newPlace)=>{
  //object parameter allows you to modify fetch 
  fetch(url + '/places/', {
    method: 'POST',
    //headers provides more information to the middleware
    headers: {
      "Content-Type": "application/json"
    },
    //takes javascript object and turns it into json
    body: JSON.stringify(newPlace)
  })
  .then (()=>getPlaces())
}


  const handleUpdate = (place) => {
    fetch(url + "/place/" + place._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(place)
    })
    .then(() => getPlaces())
  }

//function to specify place to update
const selectPlace=(place)=>{
  setSelectedPlace(place)
}

//function to delete place
const deletePlace=(place)=>{
  fetch(url + "/place/"+place._id, {
    method: "delete"
  })
  .then(()=>{
    getPlaces()
  })
}
  return (
    <div className="App">
      <h1>Favorite Places</h1>
      <hr />
      <Link to="/create">
        <button>Add Place</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => (<Display 
          {...rp} 
          places={places}
          selectPlace={selectPlace}
          deletePlace = {deletePlace}
          />)} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" place={{emptyPlace}} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" 
              place={selectedPlace} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
