import React from 'react';


const ParkCard = (props) => {
  const isName = props.name != ''
  return (
    <div>
    { isName ? (

      <h1>Park: {props.name}</h1>
) : (<h1></h1>)
    }
    </div>

  )
}

export default ParkCard
