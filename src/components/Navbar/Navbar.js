import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Navbar, Button, Dropdown, Icon, Section, Tab } from 'react-bulma-components'


class Navigation extends Component {
    // Using state to track the default state of the ~dropdown~ sub-nav
    // Making a selection hits a different Saga/Reducer
    state = {
        selected: 'default'
    }

    // Refreshing Genres_Present
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRES_PRESENT' })
    }
    // Handle Change of Genre Dropdown
    // Only shows movies of that genre
    // Only shows genres we have in the movies
    // onChange = (selected) => {
    //     this.setState({ selected }, () => {
    //         if (selected !== 'default') {
    //             this.props.dispatch({ type: "FETCH_MOVIES_BY_GENRE", payload: selected })
    //         } else {
    //             this.props.dispatch({ type: "FETCH_MOVIES" })
    //         }
    //     });
    // }

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
                {/* Both the Film icon and the Home buttons only work on paths other than "/" */}
                <Navbar
                    color="success"
                    fixed="top"
                >
                    <Container>
                        <Navbar.Brand>
                            <Navbar.Item
                                onClick={this.menuClick}>
                                <Icon size="large">
                                    <i className="fas fa-film fa-2x"></i>
                                </Icon>
                            </Navbar.Item>
                            <Navbar.Item>
                                <Button
                                    color="info"
                                    onClick={this.menuClick}>
                                    Home
                            </Button>
                            </Navbar.Item>

                            {/* If on the main path, show the dropdown to select Genres */}
                            {this.props.location.pathname === "/" &&
                                this.props.genresPresent &&
                                (
                                    <Navbar.Item >
                                        {/* <Dropdown
                                            color="info"
                                            onChange={this.onChange}
                                            value={this.state.selected}
                                        >
                                            <Dropdown.Item
                                                value="default"
                                                defaultValue>
                                                All genres
                                    </Dropdown.Item>
                                            Changed this line for the genre by genre name route test 
                                            {this.props.genresPresent.map(each =>
                                                <Dropdown.Item value={each} key={each}>
                                                    {each}
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown> */}
                                    </Navbar.Item>
                                )}
                        </Navbar.Brand>
                    </Container>
                </Navbar>

                <Section backgroundColor="warning">
                    <Container>
                        <span
                            className="navGenre"
                            style={{color: 'default'===this.state.selected && '#5ccd50'}}
                            onClick={this.allGenre}
                        >All</span>
                        {this.props.genresPresent.length > 0 &&
                            this.props.genresPresent.map(
                                eachGenre =>
                                    <span
                                        className="navGenre"
                                        style={{
                                            color: eachGenre===this.state.selected && '#5ccd50'
                                          }}
                                        key={eachGenre}
                                        onClick={() => this.filterByGenre(eachGenre)}
                                    >{eachGenre}</span>)}

                    </Container>
                    {/* <pre>{JSON.stringify(this.props.genresPresent[0].array_agg,null,2)}</pre> */}

                </Section>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Navigation));