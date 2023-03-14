import axios from 'axios'
import React, {useState, useEffect} from 'react'

const apiKey = process.env.REACT_APP_API_KEY


const getWeather = (country) => {
    if (country === undefined) return
    //console.log(country, 'getWeather country') // checck country in getWeather
    const [lat,lon] = country.latlng;

    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.data)
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [viewArray, setViewArray] = useState([])
    const [weather, setWeather] = useState([])
    
    const apiEffects =  () => {
        if (country === '') return
        axios.get('https://restcountries.com/v3.1/all')
        .then((response) => {
            const returnedCountries = response.data
            const length = country.length
            const filter = returnedCountries.filter(c => {
                const name = c.name.common.toLowerCase()
                return country.toLowerCase() === name.substring(0, length)
            })
            
            setViewArray([...filter].fill(false))
            const weather = Promise.all(filter.map(country => getWeather(country)))
            weather.then(data => {
                setCountries(filter)
                setWeather(data)
            })
            console.log(weather, 'weather promises')
            //return filter
            
            //console.log(filter)
        })
    }

    useEffect(apiEffects ,[country])

    return (
    <div>
        <div>
            Find Countries <input 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
            />
        </div>
        <CountriesView 
            countries={countries} 
            setViewArray={setViewArray} 
            viewArray = {viewArray}
            weather = {weather}
        />
    </div>)
}

const CountriesView = ({countries, setViewArray, viewArray, weather}) => {

    const changeView = (i) => {
        const newView = [...viewArray]
        newView[i] = (!newView[i])
        setViewArray(newView)
    }

    const btnText = viewArray.map(view => view ? "Hide" : "Show")

    //console.log(viewArray, 'viewArray')
    console.log(countries, 'countries')

    if (countries.length === 0) return <p>No matches</p>
    else if (countries.length === 1) {
        return(<>
        <p>One country</p>
            <CountryShow country={countries[0]} show={true} weather={weather[0]}/>
            </>
        )
    }
    else if (countries.length <10 && countries.length > 1) {
        return (
        <>
            {
              countries.map((country, i) => 
                <div key={country.cca2}>
                    <p >
                        {country.name.common}
                        <button onClick={() => changeView(i)}>
                            {btnText[i]}
                        </button>
                    </p>
                    <CountryShow 
                        country={country} 
                        show={viewArray[i]}
                        weather = {weather[i]}
                    />
                </div>
            )}
        </>
        )
    }
    else return (
        <p>Too many matches, specify another filter</p>
    )
}

const CountryShow =({country, show, weather}) => {
    console.log(weather, `weather for ${country.name.common}`)
    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    if (!show) return null
    return (
    <div key={country.cca2}>
        <h1>{country.name.common}</h1>
        <p>Captial: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <p>Languages:</p>
        <ul>
          {Object.keys(country.languages).map((key,i) =>
              <li key={i}>
                  {country.languages[key]}
              </li>
          )}
         </ul>
         <img src={country.flags.png} alt='flag'/>
         <h2>Weather</h2>
         <img
            src={icon}
            alt='icon'
         />
         <p>{weather.weather[0].main}</p>
        <p>Temperature: {weather.main.temp} Celsius</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>)
}

export default App