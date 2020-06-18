import React from 'react'
import logo from '../logo.svg'
import '../App.css'
import CardsContainer from '../components/Cards/CardsContainer'
import FiltersContainer from '../components/Filters/FiltersContainer'
import {useState,useEffect} from 'react'

function App() {
  const [cards, setCards] = useState([])
  const [filters, setFilters] = useState({region : '', bedrooms : []});
  const [bckupCards, setBckupCards] = useState([])
  const [regions, setRegions] = useState([])
  const [bedrooms, setBedrooms] = useState([])
  
  useEffect(()=>{
    fetch('https://raw.githubusercontent.com/aptuno/code-challenge/master/challenges/data/properties.json')
    .then(res => res.json())
    .then((data) => {
      setCards(data.data)
      setBckupCards(data.data)
      setRegions(() => {
         let regions = []
         data.data.map(elem => {
           if(regions.indexOf(elem.regions[0]) === -1){
             regions.push(elem.regions[0])
           }
         })
         return regions.sort()
      })
      setBedrooms(() => {
        let bedrooms = []
        data.data.map(elem => {
          if(bedrooms.indexOf(elem.bedrooms) === -1){
            bedrooms.push(elem.bedrooms)
          }
        })
        return bedrooms.sort()
     })
    })
    .catch(console.log("error"))
  },[])

  useEffect(()=>{
    setCards(bckupCards.filter(card => {
      let applyRegionFilter = false;
      let applyBedroomsFilter = false;
      if(filters.region !== ''){
        if(card.regions[0].includes(filters.region)){
          applyRegionFilter = true
        }        
      } else {
        applyRegionFilter = true
      }
      if(filters.bedrooms.length > 0) {
         filters.bedrooms.forEach(bedroom => {
            if(bedroom == card.bedrooms){
              applyBedroomsFilter = true
              return
            }
         })
      } else {
        applyBedroomsFilter = true
      }
      if(applyRegionFilter && applyBedroomsFilter){
        return card
      }
    })) 
  },[filters])

  const handleFilters=(obj)=>{
    console.log(obj)
    setFilters(obj)
  }

  return (
    <div className="App">
      <h1>List of properties</h1>
      <FiltersContainer regions={regions} 
                        bedrooms={bedrooms}
                        filters={filters} 
                        handleFiltersSelection={handleFilters}/>
      <CardsContainer data={cards}></CardsContainer>
    </div>
  );
}

export default App
