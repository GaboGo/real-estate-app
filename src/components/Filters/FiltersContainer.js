import React, { useState } from 'react'
import { Container, Dropdown, DropdownButton, Form, Button } from "react-bootstrap"

const FiltersContainer = (props) => {

    const [filterApplied,setFilterApplied] = useState(false);
    const formRef = React.createRef()
    const checkRef  = React.createRef()

    const handleRegion = (e) => {
        let copy = Object.assign({},props.filters)
        copy.region = e
        props.handleFiltersSelection(copy)
        setFilterApplied(true)
        props.handleFilterApplied(true)
    }

    const handleBedrooms = (e) => {
        let copy = Object.assign({},props.filters)
        if(e.target.checked){
          copy.bedrooms.push(e.target.id)
          setFilterApplied(true)
          props.handleFilterApplied(true)
        } else {
          let index = copy.bedrooms.indexOf(e.target.id)
          index !== -1 && copy.bedrooms.splice(index, 1)
          if(copy.bedrooms.length === 0){
            setFilterApplied(false)
            props.handleFilterApplied(true)
          }
        }
        props.handleFiltersSelection(copy)
    }

    const handleResetFilters = () => {
        let copy = {region : '', bedrooms : []}
        props.handleFiltersSelection(copy)
        setFilterApplied(false)
        props.handleFilterApplied(false)
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
        if(filterApplied){
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

export default FiltersContainer
