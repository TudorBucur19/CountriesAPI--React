import './App.css';
import React, { useState } from 'react';
import Country from './components/country';
import Neighbours from './components/neighbours';


function App() {

  const [country, setCountry] = useState();
  const [search, setSearch] = useState("");
  const [borders, setBorders] = useState();
  const [neighbours, setNeighbours] = useState([]);

 
    async function getCountry(item) {
      try {
      const response = await fetch(`https://restcountries.eu/rest/v2/name/${item}`);
      const data = await response.json();
      const info = data[0];
      console.log(info);
      
          
      setCountry({
        flag: info.flag,
        name: info.name,
        capital: info.capital,
        region: info.region,
        population: info.population,
        languages: info.languages,
        currencies: info.currencies,
        topLevelDomain: info.topLevelDomain
      });

      setBorders(info.borders);

      } catch(err) {
          alert(`Please insert a valid country name! ${err.message}`);
        }     
    };
        
    const handleChange = (event) => {
      setSearch(event.target.value);
    }

    
    async function getNeighbours() { 
        await borders.map(async (neighbour) => {
        const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        const border = await res.json();
        
        
         
        setNeighbours([...neighbours, border]);
        console.log(neighbours);
        console.log(border);
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

      <div className="neighbour">
        {neighbours && <Neighbours 
        neighbours={neighbours}
        />}
      </div>      
      
      <h2>Which country do you want to know about?</h2>
      <input className="search" type="text" value={search} onChange={handleChange}></input>
      <button className="searchBtn" onClick={()=> getCountry(search)}>Search</button>
    
    </div>
  );
}

export default App;
