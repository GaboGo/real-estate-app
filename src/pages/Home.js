import React from 'react'
import '../App.css'
import CardsContainer from '../components/Cards/CardsContainer'
import FiltersContainer from '../components/Filters/FiltersContainer'
import {useState,useEffect} from 'react'

function Home(props) {
  const [cards, setCards] = useState([])
  const [filters, setFilters] = useState({region : '', bedrooms : []});
  const [bckupCards, setBckupCards] = useState([])
  const [regions, setRegions] = useState([])
  const [bedrooms, setBedrooms] = useState([])
  const [filterApplied, setFilterApplied] = useState(false)
  
  useEffect(()=>{
    fetch('https://raw.githubusercontent.com/aptuno/code-challenge/master/challenges/data/properties.json')
    .then(res => res.json())
    .then((data) => {
      setCards(data.data)
      props.setCrds(data.data)
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
    props.setCrds(cards)
  },[filters])

  const handleFilters=(obj)=>{
    console.log(obj)
    setFilters(obj)
  }

  const handleFilterApplied=(flag)=>{
    console.log(flag)
    setFilterApplied(flag)
  }

  return (
    <div>
      <h1>List of properties</h1>
      <FiltersContainer regions={regions} 
                        bedrooms={bedrooms}
                        filters={filters} 
                        handleFiltersSelection={handleFilters}
                        handleFilterApplied={handleFilterApplied}
                        />
      <CardsContainer filterApplied={filterApplied} data={cards}></CardsContainer>
    </div>
  );
}

export default Home
