import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Columns,Button, Heading, Image, Icon, Container} from 'react-bulma-components'

class DetailsDisplay extends Component {

    handleEditClick=()=>{
        this.props.dispatch({type:"DISPLAY_MODE_FLIP"});
    }
    
    render() {
        const movie = this.props.movie;
        return (
            <>
            <Container className="detailsBox">
            
                {this.props.movieDetails.length > 0 && <div className="detailsPage">

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
                            <Button onClick={this.handleEditClick}>
                            <Icon className="editIcon" >
                            <i className="far fa-edit"></i>
                            </Icon> <p>Edit</p>
                            </Button>
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

                </div>}</Container>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(DetailsDisplay));
