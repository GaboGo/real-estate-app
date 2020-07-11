import React from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { updateData } from '../actions/DataActions'
import CardsContainer from '../components/Cards/CardsContainer'
import FiltersContainer from '../components/Filters/FiltersContainer'
import {useEffect} from 'react'

function Home(props) {

  // Any change made in the filters object trigger an update in the data 
  useEffect(()=>{
    props.updateData(props.filters)
  },[props.filters])

  return (
    <div>
      <h1>List of properties</h1>
      <FiltersContainer/>
      <CardsContainer/>
    </div>
  );
}

const mapStateToProps = state => ({
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  updateData: filters => dispatch(updateData(filters)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
