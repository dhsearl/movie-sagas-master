import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Navbar, Button, Dropdown, Icon, Section, Tab } from 'react-bulma-components'


class _Navbar extends Component {
    state = {
        selected: 'default'
    }

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_GENRES" })
        this.props.dispatch({type:'FETCH_GENRES_PRESENT'})
    }

    onChange = (selected) => {
        this.setState({ selected }, () => {
            if (selected !== 'default') {
                this.props.dispatch({ type: "FETCH_MOVIES_BY_GENRE", payload: selected })
            } else {
                this.props.dispatch({ type: "FETCH_MOVIES" })
            }
        });

    }
    render() {

        return (
            <>
    {/* Both the Film icon and the Home buttons only work on paths other than "/" */}
                <Navbar
                    color="dark"
                    fixed="top"
                    >
                        <Container>
                    <Navbar.Brand>
                        <Navbar.Item
                            onClick={() => {
                                this.props.location.pathname !== "/" &&
                                    this.props.history.push('/')
                            }}>
                            <Icon size="large">
                                <i className="fas fa-film fa-2x"></i>
                            </Icon>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button
                                color="info"
                                onClick={() => {
                                    this.props.location.pathname !== "/" &&
                                        this.props.history.push('/')
                                }}>
                                Home
                            </Button>
                        </Navbar.Item>

    {/* If on the main path, show the dropdown to select Genres */}
                        {this.props.location.pathname === "/" &&
                            <Navbar.Item >
                                <Dropdown
                                    color="info"
                                    onChange={this.onChange}
                                    value={this.state.selected}
                                >
                                    <Dropdown.Item
                                        value="default"
                                        defaultValue>
                                        All genres
                                    </Dropdown.Item>
    {/* Changed this line for the genre by genre name route test */}
                                    {this.props.genres.map(each =>
                                        <Dropdown.Item value={each.name} key={each.id}>
                                            {each.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown>
                            </Navbar.Item>
                        }
                    </Navbar.Brand>
                    </Container>
                </Navbar>
                {this.props.location.pathname === "/" &&
                <Section backgroundColor="warning">
                <Container> {this.props.genresPresent[0].array_agg.length> 0 && 
                    this.props.genresPresent[0].array_agg.map( 
                        eachGenre => 
                        <span style={{paddingRight:"1rem"}} key={eachGenre}>{eachGenre}</span> )}</Container>
                    {/* <pre>{JSON.stringify(this.props.genresPresent[0].array_agg,null,2)}</pre> */}
                    
                </Section>}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(_Navbar));