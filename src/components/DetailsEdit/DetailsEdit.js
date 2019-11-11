import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Button, Columns, Container, Image, Icon, Level } from 'react-bulma-components'

class DetailsEdit extends Component {
    state = {
        id: '',
        title: '',
        poster: '',
        description: '',
        genre: [],
    }

    componentDidMount() {
        this.setState(
            {
                ...this.props.movie,
            })
    }

    handleInputs = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value,
        })
    }
    handleGenreDropdown = (selected) => {
        this.setState({ genre: selected })
    }


    handleSaveClick = () => {
        this.props.dispatch({ type: 'UPDATE_MOVIE_DETAILS', payload: this.state })
        this.props.dispatch({ type: "DISPLAY_MODE_FLIP" });
    }
    handleCancelClick = () => {
        this.props.dispatch({ type: "DISPLAY_MODE_FLIP" });
    }

    render() {
        const movie = this.props.movie;
        const numRows = Math.round(movie.description.length / 60) + 5;
        return (
            <>
                <pre>movie props as they come to details{JSON.stringify(this.props.movie, null, 2)}</pre>
                <Container className="detailsBox">
                    {movie &&

                        <Columns>
                            <Columns.Column
                                mobile={{
                                    size: 6,
                                }}
                                tablet={{
                                    size: 3,
                                }}>
                                <Box>
                                    <Image
                                        src={movie.poster}
                                        size='2by3'
                                    />
                                </Box>
                                <Box>
                                    {movie.genres ?
                                        movie.genres.map(each => 
                                            <Level>
                                            <p>{each}</p>
                                            <Button>
                                                <Icon color="danger">
                                                    <i className="far fa-window-close"></i>
                                                </Icon>
                                            </Button>
                                            </Level>
                                        ) : <p>Uncategorized</p>
                                    }
                                </Box>
                                <Box>
                                    <Level>
                                        <Button onClick={this.handleSaveClick}>
                                            <Icon color="success">
                                                <i className="far fa-save"></i>
                                            </Icon > <p>Save</p>
                                        </Button>
                                        <Button onClick={this.handleCancelClick}>
                                            <Icon color="danger">
                                                <i className="far fa-window-close"></i>
                                            </Icon><p>Cancel</p>
                                        </Button>
                                    </Level>
                                </Box>
                            </Columns.Column>
                            <Columns.Column>
                                <input className="inputTitle" value={this.state.title} onChange={(event) => this.handleInputs(event, 'title')} />
                                <select
                                    className="inputGenre"
                                    onChange={(event) => this.handleInputs(event, 'genre')}
                                    value={this.state.genre}
                                >
                                    {this.props.genres.map(each =>
                                        <option value={each.name} key={each.id}>
                                            {each.name}
                                        </option>
                                    )}
                                </select>
                                <Box
                                    backgroundColor="dark"
                                    textColor="white"
                                >
                                    <textarea rows={numRows} className="inputTextBox" value={this.state.description} onChange={(event) => this.handleInputs(event, 'description')} />
                                </Box>
                            </Columns.Column>
                        </Columns>
                    }
                </Container>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(DetailsEdit));
