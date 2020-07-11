import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setCurrentPage } from '../../actions/DataActions'
import { Container, Col, Row, Pagination } from "react-bootstrap"
import Card from "./Card"

const CardsContainer = (props) => {
    
    const [cards, setCards] = useState([])

    useEffect(()=>{
        setCards(props.data && props.data.length > 0 ? props.data.map((card, i) => {  
            return (
               <Card key={card.id} info={card}></Card>
            )
        }): props.isFetching ? <span>Loading data...</span> : <span>No results were found</span> )
    },[props.data])

    useEffect(()=>{
      props.filterApplied && props.setCurrentPage(1)
    },[props.filterApplied])

    const cardsPerPage = 12
    let indexOfLastCard = props.currentPage * cardsPerPage
    let indexOfFirstCard = indexOfLastCard - cardsPerPage
    let currentCards = cards.length > 0 ? cards.slice(indexOfFirstCard, indexOfLastCard) : props.isFetching ? <span>Loading data...</span> : <span>No results were found</span>

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(cards.length / cardsPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <Pagination.Item key={number} id={number} active={number === props.currentPage} onClick={() => {props.setCurrentPage(number)}}>
                {number}
            </Pagination.Item>
        );
    })

    const renderPagination = () => {
      if(currentCards.length > 0){
        return (
          <Pagination size="sm" className="justify-content-center align-items-center">
            <Pagination.First onClick={() => {goFirstPage()}}/>
            <Pagination.Prev onClick={() => {goPrevPage()}}/>
            {renderPageNumbers}
            <Pagination.Next onClick={() => {goNextPage()}}/>
            <Pagination.Last onClick={() => {goLastPage()}}/>
          </Pagination>
        );
      }
    }

    const goLastPage = () => {
      props.setCurrentPage(pageNumbers[pageNumbers.length - 1])
    }

    const goFirstPage = () => {
      props.setCurrentPage(1)
    }

    const goNextPage = () => {
        if(props.currentPage === pageNumbers.length){
          props.setCurrentPage(1)
        } else {
          props.setCurrentPage(props.currentPage + 1)
        }  
    }

    const goPrevPage = () => {
        if(props.currentPage === 1){
          props.setCurrentPage(pageNumbers[pageNumbers.length - 1])
        } else {
          props.setCurrentPage(props.currentPage - 1)
        }  
    }

    return (
        <Container fluid={true}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col lg={11}>
                {renderPagination()}
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col lg={11}>
                <Container fluid={true} className="d-flex flex-wrap justify-content-center">
                  {currentCards}
                </Container>
            </Col>
          </Row>
          <Row className="mt-4 d-flex justify-content-center align-items-center">
            <Col lg={11}>
                {renderPagination()}
            </Col>
          </Row>
      </Container>
    );
}

const mapStateToProps = state => ({
  filterApplied: state.filterApplied,
  currentPage: state.data.currentPage,
  data: state.data.items,
  isFetching: state.data.isFetching
})

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer)
