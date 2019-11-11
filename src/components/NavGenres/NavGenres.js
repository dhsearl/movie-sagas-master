import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Navbar, Button, Heading, Icon, Section, Tab } from 'react-bulma-components'



// The sub nav is populated with genres that exist in the collection
// I removed a dropdown in favor of a simpler method
class SubNav extends Component {

    // Using state to track the default state of the ~dropdown~ sub-nav
    // Making a selection hits a different Saga/Reducer
    state = {
        selected: 'default'
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
    allGenre = () => {
        this.setState({
            selected: 'default'
        })
        this.props.dispatch({ type: "FETCH_MOVIES" })
    }
    menuClick = () =>{
        this.allGenre();
        if (this.props.location.pathname !== "/") this.props.history.push('/');
    }

    render() {

        return (
            <>
                {this.props.location.pathname === "/" &&
                <Section backgroundColor="warning">
                    <Container>
                        <div
                            className="navGenre"
                            style={{color: 'default'===this.state.selected && '#f96167'}}
                            onClick={this.allGenre}
                        >All</div>
                        {this.props.genresPresent.length > 0 &&
                            this.props.genresPresent.map(
                                eachGenre =>
                                    <div
                                        className="navGenre"
                                        style={{
                                            color: eachGenre===this.state.selected && '#f96167'
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
export default withRouter(connect(mapReduxStateToProps)(SubNav));