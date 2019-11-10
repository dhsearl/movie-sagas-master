import React, { Component } from 'react';
// import { connect } from 'react-redux'
import Gallery from '../Gallery/Gallery'
import Details from '../Details/Details'
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Container } from 'react-bulma-components'
class RouteContainer extends Component {

    render() {
        
        return (
            <Route render ={({ location })=>(
                <Container>
               <TransitionGroup>
                <CSSTransition
                    key={location.pathname}
                    timeout={300}
                    classNames='fade'

                > 
                    <Switch location={location}>
                        <Route path="/" exact component={Gallery} />
                        <Route path="/:id" children={Details} />
                    </Switch>
                   
                </CSSTransition>
                </TransitionGroup> 
                </Container>
            )}/>
        )
    }
}

export default withRouter(RouteContainer);

