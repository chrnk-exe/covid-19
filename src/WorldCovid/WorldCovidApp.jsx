import React, {useState} from 'react'
import classes from './WorldCovidApp.module.css'
import countries from '../countries'
import WorldCovid from './WorldCovid'

const WorldCovidApp = () => {
  const [countryName, setCountryName] = useState('')
  const [showDropDown, setDropDown] = useState(false)
  const [country, setCountry] = useState('')

  const countryInputHandler = event => {
    setCountryName(event.target.value)
    if(event.target.value !== ''){
      let length = countries.filter((country) => {
        let lcountry = country.toLowerCase()
        let lcountryName = event.target.value.toLowerCase()
        return lcountry.indexOf(lcountryName) === 0
      }).length
      if(length !== 0)setDropDown(true)
    }
  }

  const onSelectCountry = event => {
    setDropDown(false)
    setCountryName(event.target.textContent)
    setCountry(event.target.textContent)
  }

  return (
    <div className={classes.App} onClick={() => setDropDown(false)}>
      <div className={classes.inputContainer} onClick={(e) => e.stopPropagation()}>
      <input className={classes.worldInput} placeholder='Введите название страны' value={countryName} onChange={countryInputHandler} onClick={() => setCountryName('')}/>
      {
        showDropDown && countryName?
        (<div className={classes.dropDownInput} onClick={(e) => e.stopPropagation()}>
          <ul className={classes.dropDownList}>
          {countries.filter((country) => {
            let lcountry = country.toLowerCase()
            let lcountryName = countryName.toLowerCase()
            return lcountry.indexOf(lcountryName) === 0
          }).map((country, index) => (
            <li onClick={onSelectCountry} value={country} key={index}>{country}</li>
          ))}
          </ul>
        </div>)
        : null
      }
      </div>
      {
        country !== ''
        ? <WorldCovid country={country}></WorldCovid>
        : null
      }
    </div>
  )
}

export default WorldCovidApp