import React from "react"
import { Consumer } from "./Context"
import { Rate } from 'antd';


class ParkCard extends React.Component {
  constructor(context) {
    super(context)
  }

  render () {

    return (
      <Consumer>
        {context => {
          if (context && context.address) {
            if (context.markers) {
              return <div className="parkCard">
                        <h5>{context.name}</h5>
                        <p>{context.parkAddress}</p>
                        <h6>{context.rating}</h6>
                      </div>
            }}
          }}
      </Consumer>

    )
  }
}

export default ParkCard
