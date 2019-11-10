import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Columns, Container, Heading, Image, Tile } from 'react-bulma-components'

class Details extends Component {
    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIE_DETAILS", payload: this.props.match.params.id })
    }
    render() {
        const movie = this.props.movieDetails[0];
        return (
            <>
            <Box className="detailsBox">
            
                {this.props.movieDetails.length > 0 && <div className="detailsPage">
                    {/* <pre>{JSON.stringify(this.props.movieDetails[0], null, 2)}</pre> */}
                    <Columns>
                        <Columns.Column
                            mobile={{
                                size: 6,
                            }}
                            tablet={{
                                size: 'one-third',
                            }}
                            desktop={{
                                size: 'one-third',
                            }}
                            widescreen={{
                                size: 'one-quarter',
                            }}
                            fullhd={{
                                size: 'one-fifth',
                            }}>
                            <Box>

                                <Image
                                    src={movie.poster}
                                    size='2by3'
                                />
                            </Box>
                        </Columns.Column>
                        <Columns.Column>

                            <Heading size={1}>
                                {movie.title}
                            </Heading>
                            <Heading subtitle size={3}>
                                {movie.genre}
                            </Heading>
                            <Box
                            backgroundColor="dark"
                            textColor="white"
                            >{movie.description}</Box>
                        </Columns.Column>
                    </Columns>

                </div>}</Box>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Details));
