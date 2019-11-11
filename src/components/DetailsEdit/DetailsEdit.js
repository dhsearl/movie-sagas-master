import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Button, Columns, Container, Image, Icon, Level } from 'react-bulma-components'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
class DetailsEdit extends Component {
    state = {
        id: '',
        title: '',
        poster: '',
        description: '',
        rating: 3,
    }

    componentDidMount() {
        this.setState(
            {
                ...this.props.movie,
            })
    }
    // click and event handlers
    //
    handleRating = (click)=>{
        this.props.dispatch({type:"UPDATE_MOVIE_RATING", payload: { id: this.props.movie.id, rating: click.rating}})
    }
    handleInputs = (event, value) => {
        this.setState({
            ...this.state,
            [value]: event.target.value,
        })
    }
    handleGenreDropdown = (event, selected) => {
        if ((this.state.genres == null || !this.state.genres.includes(event.target.value)) && event.target.value !== 'default') {
            const newGenrePayload = { id: this.state.id, newGenre: event.target.value }
            this.props.dispatch({ type: "ADD_GENRE", payload: newGenrePayload })
        }
    }
    handleGenreDelete = (genre) => {
        const deletePayload = { id: this.state.id, genre: genre }
        this.props.dispatch({
            type: "REMOVE_GENRE_FROM",
            payload: deletePayload
        });
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

                <Container className="detailsBox">
                    {movie &&
                        <Columns>
                            <Columns.Column
                                mobile={{ size: 6, }}
                                tablet={{ size: 4, }}>
                                <Box>
                                    <Image src={movie.poster} size='2by3' />
                                </Box>
                                <Box>
                                    <Rater color="#FEd847" total={5} rating={movie.rating} interactive={true} onRate={(click)=>this.handleRating(click)}/>
                                </Box>
                                <Box>
                                    {movie.genres ?
                                        movie.genres.map((each, i) =>
                                            <Level key={each + i}>
                                                <p>{each}</p>
                                                <Button onClick={() => { this.handleGenreDelete(each) }}>
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
                                            </Icon >
                                            <p>Save</p>
                                        </Button>
                                        <Button onClick={this.handleCancelClick}>
                                            <Icon color="danger">
                                                <i className="far fa-window-close"></i>
                                            </Icon>
                                            <p>Cancel</p>
                                        </Button>
                                    </Level>
                                </Box>
                            </Columns.Column>
                            <Columns.Column>
                                <input className="inputTitle" value={this.state.title} onChange={(event) => this.handleInputs(event, 'title')} />
                                <select multiple={false}
                                    className="inputGenre"
                                    onChange={(event) => this.handleGenreDropdown(event, 'genre')}
                                >
                                    <option value="default" defaultValue>Add Genre</option>
                                    {this.props.genres.map(each =>
                                        <option value={each.name} key={each.id}>
                                            {each.name}
                                        </option>
                                    )}
                                </select>
                                <Box backgroundColor="dark" textColor="white">
                                    <textarea rows={numRows} className="inputTextBox" value={this.state.description} onChange={(event) => this.handleInputs(event, 'description')} />
                                </Box>
                            </Columns.Column>
                        </Columns>
                    }
                </Container>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(DetailsEdit));
