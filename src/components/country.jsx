import React from 'react';

const Country = ({country, neighbours}) => {
  const {flag, name, capital, region, population, languages, currencies, topLevelDomain} = country;
    return(
        <div>
            <article className="country">
              <img className="country__img" src={flag} alt="flag" />
              <div className="country__data">
                <h3 className="country__name">{name}</h3>
                <h4 className="country__region">{region}</h4>
                <p><span>&#128081; </span>{capital}</p>
                <p className="country__row"><span>👫 </span>{ (+population / 1000000).toFixed(1)} milion people</p>
                <p className="country__row"><span>&#128218;</span>{languages.map(el => " " + el.name)}</p>
                <p className="country__row"><span>💰</span>{currencies.map(el => " " + el.name)}</p>
                <p><span>&#128225; </span>{topLevelDomain}</p>
              </div>
            </article>
        </div>

    )
};

export default Country;