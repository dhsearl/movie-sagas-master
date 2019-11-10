import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Content, Heading } from 'react-bulma-components'
class GalleryPosterCard extends Component {

    routeToMovieDetails = (id) => {
        this.props.history.push(`/${id}`)
    }

    makeShorter = (description) => {
        if (description.length > 144) return description.slice(0, 144) + "..."
        else return description
    }

    render() {
        const movie = this.props.movieData;
        const movieDescriptionShort = this.makeShorter(movie.description);
        return (
      
            <Card style={{ width: "185px", margin: '1rem'  }} onClick={() => this.routeToMovieDetails(movie.id)}>

                <Card.Header>
                    <Card.Header.Title backgroundColor="link">
                        {movie.name}
                    </Card.Header.Title>
                </Card.Header>

                <Card.Image style={{ width: "185px", height: 'auto' }} src={movie.poster} />

                <Card.Content>
                    <Heading size={4}>{movie.title}</Heading>
                    <Content>
                        {movieDescriptionShort} <Content style={{ display: "inline" }} textColor="link">more.</Content>
                    </Content>
                </Card.Content>
            </Card>
        )
    }
}

export default withRouter(connect()(GalleryPosterCard));

