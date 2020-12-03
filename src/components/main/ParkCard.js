import React from "react"
import { Consumer } from "./Context"
import ParkCard2 from "./ParkCard2"
import { Rate } from 'antd';


class ParkCard extends React.Component {
  constructor(context) {
    super(context)
  }

  render (context) {
    let ratingNum;
    if (context) {

      if (context.rating == '' || context.rating == null) {
        ratingNum = ''
        console.log("heredsklf;kdwf;l")
      } else {
        console.log("here HERERERE")
        ratingNum = <p>{context.rating} ' / 5 '</p>
      }

    }

    return (
      <Consumer>
        {context => {
          if (context && context.address) {
            if (context.markers) {
              return <div className="parkCard">
                        <h5>{context.name}</h5>
                        <p>{context.address}</p>
                        <p>{ratingNum}</p>
                      </div>
            }}
          }}
      </Consumer>

    )
  }
}

export default ParkCard
