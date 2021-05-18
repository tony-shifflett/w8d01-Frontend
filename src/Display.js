import React from "react";

const Display = (props) => {

  //destructure the places from props
  const { places } = props
  
  const loaded = () =>(
    <div style={{textAlign: 'center'}}>
      {places.map((place)=>(
        <article key={place.id}>
          <img src={place.img}/>
          <h1>{place.name}</h1>
          <p>{place.description}</p>
          <button onClick={()=>{
            props.selectPlace(place)
            props.history.push("/edit")}}>Edit</button>
          <button onClick={()=>{props.deletePlace(place)}}>Delete</button>
        </article>
      ))}
    </div>
  )

  //loading function in case of no places
  const loading = ()=><h1>Loading</h1>

  // return <h1>Display</h1>;
  return places.length >0 ? loaded() : loading()
};

export default Display;