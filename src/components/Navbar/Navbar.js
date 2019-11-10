import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar, Button, Dropdown, Icon } from 'react-bulma-components'


class _Navbar extends Component {
    state = {
        selected: 'default'
    }

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_GENRES" })
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
                <Navbar
                    color="dark">
                    <Navbar.Brand>
                        <Navbar.Item
                            onClick={() => { this.props.location.pathname !== "/" && this.props.history.push('/') }}
                        >
                            <Icon size="large">
                                <i className="fas fa-film fa-2x"></i>
                            </Icon>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button
                                color="info"
                                onClick={() => { this.props.location.pathname !== "/" && this.props.history.push('/') }} >
                                Home </Button>
                        </Navbar.Item>
                        {this.props.location.pathname === "/" &&
                            <Navbar.Item >
                                <Dropdown
                                    color="info"
                                    onChange={this.onChange}
                                    value={this.state.selected}
                                >
                                    <Dropdown.Item value="default" defaultValue>All genres</Dropdown.Item>
                                    {this.props.genres.map(each =>
                                        <Dropdown.Item value={each.id} key={each.id}>
                                            {each.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown>
                            </Navbar.Item>
                        }
                    </Navbar.Brand>
                </Navbar>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(_Navbar));