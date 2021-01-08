import React from 'react';
import './neighbours.styles.css';

const Neighbours = ({neighbours}) => {
    return(
        <div>
            {neighbours.map(neighbour =>
            <div> 
                <img src={neighbour.flag}></img>
                <p>{neighbour.name}</p>
                <p>{neighbour.region}</p>
            </div>
            )}           
                      
        </div>  
    )
};

export default Neighbours;