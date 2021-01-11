import './App.css';
import React, { useState } from 'react';
import Country from './components/country';



function App() {

  const [country, setCountry] = useState();
  const [search, setSearch] = useState("");
  const [borders, setBorders] = useState([]);
  const [neighbours, setNeighbours] = useState([]);

 
    async function getCountry(item) {
      try {
      const response = await fetch(`https://restcountries.eu/rest/v2/name/${item}`);
      const data = await response.json();
      const country = data[0];
            
      setCountry({...country});      
      setBorders(country.borders);

      } catch(err) {
          alert(`Please insert a valid country name! ${err.message}`);
        }     
    };
        
    const handleChange = (event) => {
      setSearch(event.target.value);
    }

    
    async function getNeighbours() {
      if(country.borders.length === 0){
        alert(`${country.name} has no neighbours!`)
      } 
        await borders.map(async (neighbour) => {
        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        const border = await res.json();
        setNeighbours((previousNeigbours) => [...previousNeigbours, border]);
    });
  }  

  
  return (
    <div className="container">
      
      <div className="country">
        {country&&<Country  
        country={{...country}}
        neighbours = {() => getNeighbours()}
        />}    
      </div>

      {borders.length !== 0 && 
      <div>
        <div className="neighbour">
          {neighbours.map(neighbour => 
            <Country country={neighbour}/>)}
        </div>
        <div>
          <button onClick={() => getNeighbours()} className="neighboursBtn">
            Show {country.name}'s neighbours 
          </button>
        </div>
      </div>}

      {/* <div className="neighbour">
        {neighbours && <Neighbours 
        neighbours={neighbours}
        />}
      </div>       */}
      
      <h2>Which country do you want to know about?</h2>
      <input className="search" type="text" value={search} onChange={handleChange}></input>
      <button className="searchBtn" onClick={()=> getCountry(search)}>Search</button>
    
    </div>
  );
}

export default App;
