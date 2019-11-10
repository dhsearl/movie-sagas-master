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
            <Container>
                <pre>{JSON.stringify(this.props,null,2)}</pre>
                
            <TransitionGroup>
                <CSSTransition
                    key={this.props.location.pathname}
                    timeout={300}
                    classNames='fade'
                >
                    <Switch location={this.props.location}>
                        <Route path="/" exact component={Gallery} />
                        <Route path="/details/:id" children={Details} />
                    </Switch>
                    
                </CSSTransition>
                </TransitionGroup>

            </Container>
        )
    }
}

export default withRouter(RouteContainer);

