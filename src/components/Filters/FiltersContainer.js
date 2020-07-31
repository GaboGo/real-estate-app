import React from 'react'
import { connect } from 'react-redux'
import { setFilterApplied, setFilters } from '../../actions/FiltersActions'
import { Container, Dropdown, DropdownButton, Form, Button } from "react-bootstrap"

const FiltersContainer = (props) => {

    const formRef = React.createRef()
    const checkRef  = React.createRef()

    const handleRegion = (e) => {
        let copy = Object.assign({},props.filters)
        copy.region = e
        props.handleFiltersSelection(copy)
        props.setFilterApplied(true)
    }

    const handleBedrooms = (e) => {
        let copy = Object.assign({}, props.filters)
        if(e.target.checked){
          copy = Object.assign({}, props.filters, {
            bedrooms: [...props.filters.bedrooms, e.target.id]
          })
          props.setFilterApplied(true)
        } else {
          let index = copy.bedrooms.indexOf(e.target.id)
          if(index !== -1) {
            copy = Object.assign({}, props.filters, {
                bedrooms: props.filters.bedrooms.slice(0, index).concat(props.filters.bedrooms.slice(index + 1, props.filters.bedrooms.length))
            })
          }
          if(copy.bedrooms.length === 0) {
            props.setFilterApplied(false)
          }
        }
        props.handleFiltersSelection(copy)
    }

    const handleResetFilters = () => {
        let copy = {region : '', bedrooms : []}
        props.handleFiltersSelection(copy)
        props.setFilterApplied(false)
        formRef.current.reset()
    }

    const RenderRegionOptions = props.regions.map(region => {
        return (
            <Dropdown.Item key={region} eventKey={region}>{region}</Dropdown.Item>
        )
    })

    const RenderBedroomsOptions = props.bedrooms.map(bedroom => {
        return (
            <Form.Check key={bedroom} ref={checkRef} onChange={event => {handleBedrooms(event)}} inline label={bedroom} type="checkbox" id={bedroom} />
        )
    })

    const RenderResetFiltersButton = () => {
        if(props.filterApplied){
            return (
                <Button className=" d-flex flex-row align-self-center" onClick={handleResetFilters} variant="link">Reset Filters</Button>
             )
        }
    }

    return (
        <Container className="d-flex flex-row justify-content-center" fluid={true}>
          <div className="p-4 d-flex flex-row bd-highlight mb-2">
                <p className="p-2 bd-highlight">Filter By: </p>
                <DropdownButton
                    className="bd-highlight"
                    alignRight
                    title={props.filters.region === '' ? 'Regions' : props.filters.region}
                    id="dropdown-menu-align-right"
                    onSelect={handleRegion}
                        >
                    {RenderRegionOptions}
            </DropdownButton>
          </div>
          <div className="p-4">
            <Form id='myForm' ref={formRef}>
                <Form.Label className="p-2" sm="2">Bedrooms: </Form.Label>
                {RenderBedroomsOptions}
            </Form>
          </div>
          <div className="p-4">
            {RenderResetFiltersButton()}
          </div>
       </Container>
    );
}

const mapStateToProps = state => ({
    filterApplied: state.filterApplied,
    filters: state.filters,
    regions: state.data.regions,
    bedrooms: state.data.bedrooms
})
  
const mapDispatchToProps = dispatch => ({
    setFilterApplied: flag => dispatch(setFilterApplied(flag)),
    handleFiltersSelection: obj => dispatch(setFilters(obj))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer)
