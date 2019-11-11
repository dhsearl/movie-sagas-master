import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Columns, Button, Heading, Image, Icon, Container } from 'react-bulma-components'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

class DetailsDisplay extends Component {

    handleRating = (click)=>{
        this.props.dispatch({type:"UPDATE_MOVIE_RATING", payload: { id: this.props.movie.id, rating: click.rating}})
    }
    handleEditClick = () => {
        this.props.dispatch({ type: "DISPLAY_MODE_FLIP" });
    }

    render() {
        const movie = this.props.movie;
        return (
            <Container className="detailsBox">

                {movie && 
                // <div className="detailsBoxSpace">
                    <Columns>
                        <Columns.Column
                            mobile={{ size: 6, }}
                            tablet={{ size: 4, }}
                        >
                            <Box>
                                <Image src={movie.poster} size='2by3' />
                            </Box>

                            <Box>
                                {movie.genres ?
                                    <ul style={{ listStyle: 'none' }}>
                                        {movie.genres.map((each, i) =>
                                            <li key={i}> {each} </li>
                                        )}</ul>
                                    : <p>Uncategorized</p>
                                }
                            </Box>
                            <Box>
                                <Button onClick={this.handleEditClick}>
                                    <Icon className="editIcon">
                                        <i className="far fa-edit"></i>
                                    </Icon>
                                    <p>Edit</p>
                                </Button>
                            </Box>
                        </Columns.Column>

                        <Columns.Column>
                        <Rater color="#FEd847" total={5} rating={movie.rating} interactive={true} onRate={(click)=>this.handleRating(click)}/>

                            <Heading size={1}>
                                {movie.title}
                            </Heading>
                 
                            <Heading subtitle size={3}>
                                {movie.genre}
                            </Heading>
                            <Box backgroundColor="dark" textColor="white">
                                {movie.description}
                            </Box>
                        </Columns.Column>
                    </Columns>
                    // </div>
                    }
            </Container>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(DetailsDisplay));
