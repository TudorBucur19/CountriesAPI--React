import React from 'react';

const Neighbours = ({neighbours}) => {
    return(
        <div>
            {neighbours.map(neighbour =>
            <div> 
                <img src={neighbour.flag}></img>
                <p>{neighbour.name}</p>
            </div>
            )};           
                      
        </div>  
    )
};

export default Neighbours;