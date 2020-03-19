import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import App from '../App'
import Admin from '../pages/admin'
import Buttons from '../pages/ui/buttons'
import Modals from '../pages/ui/modals'
import NoMatch from '../pages/not_fount'
import Loadings from '../pages/ui/loadings'
import Notice from '../pages/ui/notice'
import Messages from '../pages/ui/messages'
import Tabs from '../pages/ui/tabs'
import Gallery from '../pages/ui/gallery'
import Carousel from '../pages/ui/carousel'
import FormLogin from '../pages/form/login'

import BasicTable from '../pages/table/basicTable'

import RichText from '../pages/rich'

import City from '../pages/city'

export default class router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
        
          <Route path="/login" component={Login} />
          <Route path="/" render={() => (
            <Admin>
              <Switch>
                
                <Route path="/home" component={Home} />
                <Route path="/ui/buttons" component={Buttons} />
                <Route path="/ui/buttons" component={Buttons} />
                <Route path="/ui/modals" component={Modals} />
                <Route path="/ui/loadings" component={Loadings} />
                <Route path="/ui/notification" component={Notice} />
                <Route path="/ui/messages" component={Messages} />
                <Route path="/ui/tabs" component={Tabs} />
                <Route path="/ui/gallery" component={Gallery} />
                <Route path="/ui/carousel" component={Carousel} />


                <Route path="/form/login" component={FormLogin} />

                <Route path="/table/basic" component={BasicTable} />
                <Route path="/rich" component={RichText} />

                <Route path="/city" component={City} />

                <Redirect to="/home" />
                <Route  component={NoMatch} />
              </Switch>
            </Admin>
          )} />
        </App>
      </HashRouter>
    )
  }
}
