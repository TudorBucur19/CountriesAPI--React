import './App.scss';
import React, { useState } from 'react';
import Country from './components/country';



function App() {

  const [country, setCountry] = useState();
  const [search, setSearch] = useState("");
  const [borders, setBorders] = useState([]);
  const [neighbours, setNeighbours] = useState([]);
  const [isNeighbour, setIsNeighbour] = useState(false);

 
    async function getCountry(item) {
      try {
      const response = await fetch(`https://restcountries.eu/rest/v2/name/${item}`);
      const data = await response.json();
      const country = data[0];
            
      setCountry({...country});      
      setBorders(country.borders);
      setSearch('');

      } catch(err) {
          alert(`Please insert a valid country name! ${err.message}`);
        }     
    };
        
    const handleChange = (event) => {
      setSearch(event.target.value);
    };

    const handleKeyPress = (event) => {
      if(event.charCode === 13){
        getCountry(search);
      }
    }

    
    async function getNeighbours() {
      if(country.borders.length === 0){
        alert(`${country.name} has no neighbours!`)
      } 
        borders.map(async (neighbour) => {
        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        const border = await res.json();
        setNeighbours((previousNeigbours) => [...previousNeigbours, border]);
        setIsNeighbour(true);
        });
    }  

  
  return (
    <div className="container">
      
      <div>
        {country && <Country  
        country={{...country}}
        />}    
      </div>
      

      {borders.length !== 0 &&
      <div>
        <div className="neighbour">
          {neighbours.map(neighbour => 
            <Country country={neighbour}/>)}
        </div>
        <div>
          {!isNeighbour &&
          <button onClick={() => getNeighbours()} className="neighboursBtn">
            Show {country.name}'s neighbours 
          </button>
          }
      </div>        
      </div>}
          
      <h2>Which country do you want to know about?</h2>
      <input 
      className="search" 
      type="text" 
      value={search} 
      onChange={handleChange} 
      onKeyPress={handleKeyPress}
      ></input>
      
      <button 
      className="searchBtn" 
      onClick={()=> getCountry(search)}
      >
      Search
      </button>
    
    </div>
  );
}

export default App;
