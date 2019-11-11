import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Navbar, Heading, Icon, Section, Dropdown } from 'react-bulma-components'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


// The sub nav is populated with genres that exist in the collection
// I removed a dropdown in favor of a simpler method
class Navigation extends Component {

    // Using state to track the default state of the ~dropdown~ sub-nav
    // Making a selection hits a different Saga/Reducer
    state = {
        selected: 'default',
        rating: 'default'
    }

    // Refreshing Genres for SubNav
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRES_PRESENT' })
    }


    filterByGenre = (genre) => {
        this.setState({
            selected: genre
        })
        this.props.dispatch({ type: "FETCH_MOVIES_BY_GENRE", payload: genre })
    }
    byRating = (selected) =>{
        console.log(selected)
        this.props.dispatch({ type: "FETCH_MOVIES_BY_RATING", payload: selected })
    }
    allGenre = () => {
        this.setState({
            selected: 'default'
        })
        this.props.dispatch({ type: "FETCH_MOVIES" })
    }
    menuClick = () => {
        this.allGenre();
        if (this.props.location.pathname !== "/") this.props.history.push('/');
        this.props.dispatch({ type: "SET_TO_DISPLAY" });
    }

    render() {

        return (
            <>
                <Navbar
                    color="success"
                    fixed="top"
                >
                    <Container>
                        <Navbar.Brand>
                            <Navbar.Item
                                onClick={this.menuClick}>
                                <Icon size="large" color="dark">
                                    <i className="fas fa-film fa-2x"></i>
                                </Icon>
                            </Navbar.Item>
                            <Navbar.Item onClick={this.menuClick}> <Heading size={2}>Prime Movie Time</Heading></Navbar.Item>
                        </Navbar.Brand>
                        <Navbar.Container>
                            <Navbar.Item >
                                <Dropdown
                                    color="success"
                                    onChange={this.byRating}
                                    value={this.state.rating}
                                >
                                    <Dropdown.Item
                                        value="default"
                                        defaultValue>
                                        By Rating
                                    </Dropdown.Item>
                                    {[5,4,3,2,1].map(x => 

                                        <Dropdown.Item value={x} key={`rated${x}`}>
                                            <Rater total={5} rating={x} interactive={false} />
                                        </Dropdown.Item>
                                    )}
                                </Dropdown>
                            </Navbar.Item>
                        </Navbar.Container>
                    </Container>
                </Navbar>

                {this.props.location.pathname === "/" &&
                    <Section backgroundColor="warning">
                        <Container>
                            <div
                                className="navGenre"
                                style={{ color: 'default' === this.state.selected && '#f96167' }}
                                onClick={this.allGenre}
                            >All</div>
                            {this.props.genresPresent.length > 0 &&
                                this.props.genresPresent.map(
                                    eachGenre =>
                                        <div
                                            className="navGenre"
                                            style={{
                                                color: eachGenre === this.state.selected && '#f96167'
                                            }}
                                            key={eachGenre}
                                            onClick={() => this.filterByGenre(eachGenre)}
                                        >{eachGenre}</div>)}

                        </Container>
                    </Section>}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Navigation));