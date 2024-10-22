import React from "react";

const Header = ({state, country, count, most_type}) => {

    return (
      <>    
        <div className="set">
            <h2>{state}</h2>
            <h2>{country}</h2>
        </div>

        <div className="set">
            <h2>Places Total:</h2>
            <h2>{count}</h2>
        </div>

        <div className="set">
            <h2>Most Frequent:</h2>
            <h2>{most_type}</h2>
        </div>
  
      </>
    )
  }
  
  export default Header