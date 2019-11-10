import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Box, Button, Columns, Container,  Image, Icon, Level} from 'react-bulma-components'
import './DetailsEdit.css'

class DetailsEdit extends Component {
    state={
        id:'',
        title:'',
        poster:'',
        description:'',
        genre:'',
    }

    componentDidMount() {
        this.setState(
            {
                ...this.props.movieDetails[0],
            })
    }
    handleInputs =(event, value) =>{
        this.setState({
            ...this.state,
            [value]: event.target.value,
        })
    }
    handleSaveClick = ()=>{
        this.props.dispatch({type:'UPDATE_MOVIE_DETAILS', payload: this.state})
        this.props.dispatch({type:"DISPLAY_MODE_FLIP"});
    }
    handleCancelClick = ()=>{
        this.props.dispatch({type:"DISPLAY_MODE_FLIP"});
    }

    render() {
        const movie = this.props.movie;
        const numRows = Math.round(this.props.movie.description.length / 60) + 5;
        return (
            <>
            <Container className="detailsBox">
            {/* <pre>Props:{JSON.stringify(this.props,null,2)}</pre>
            <pre>State:{JSON.stringify(this.state,null,2)}</pre>
             */}
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
                               <Level>
                            <Button onClick={this.handleSaveClick}>
                               <Icon color="success">
                               <i class="far fa-save"></i>
                            </Icon > <p>Save Edit</p> 
                            </Button>
                            <Button onClick={this.handleCancelClick}>
                               <Icon color="danger">
                               <i class="far fa-window-close"></i>
                            </Icon>
                            </Button>
                            </Level>
                            </Box>
                        </Columns.Column>
                        <Columns.Column>
                            <input className="inputTitle" value={this.state.title} onChange={(event)=>this.handleInputs(event,'title')} />
                            <input className="inputGenre" value={this.state.genre} onChange={(event)=>this.handleInputs(event,'genre')} />                            
                            <Box
                            backgroundColor="dark"
                            textColor="white"
                            >
                                <textarea rows={numRows} className="inputTextBox" value={this.state.description} onChange={(event)=>this.handleInputs(event,'description')}  />
                            </Box>
                        </Columns.Column>
                    </Columns>

                </div>}
                </Container>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(DetailsEdit));
