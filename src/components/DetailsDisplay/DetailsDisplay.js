import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Columns, Heading, Image, Icon } from 'react-bulma-components'

class Details extends Component {
    state={
        displayMode:true,
    }

    
    render() {
        const movie = this.props.movieDetails[0];
        return (
            <>
            <Box className="detailsBox">
            
                {this.props.movieDetails.length > 0 && <div className="detailsPage">

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
                            <Box>
                            <Icon onClick={this.handleEditClick}>
                            <i className="far fa-edit"></i>
                            </Icon><p >Edit Entry</p>
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
                            >{movie.description}
                            
                            </Box>
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
