import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { Container } from 'reactstrap'

import Header from './components/Header'
import Footer from './components/Footer'

import Technician from './pages/Technician'
import Technicians from './pages/Technicians'
import NewTechnician from './pages/NewTechnician'

import './style/global.css'

function App() {
    return (
        <Router>
            <br /><br />
            <Container style={{border: 'solid 1px #303030', borderRadius: '10px', borderColor: '#5778B9', background: 'white'}}>
                <Header />
                <Switch>
                    <Route path='/' exact component={Technicians} />
                    <Route path='/technician/new' exact component={NewTechnician} />
                    <Route path='/technician/:id' exact component={Technician} />
                </Switch>
                <Footer />
            </Container>
        </Router>
    );
}

export default App;
