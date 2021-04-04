import React from "react";
import './css/App.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import FireBase from './components/util/firebase';

import NavBar from './components/builder/navbar';
import Footer from './components/builder/footer';

// Alle paginas
import Home from './components/navigation/Home';
import Series from './components/navigation/Series';
import Films from './components/navigation/Films';
import MyList from './components/navigation/MyList';
import NewAndPopular from './components/navigation/NewAndPopular';

// ! Test API ! //
import API from './components/util/api';
import User from "./components/util/user";

class App extends React.Component {
    state = {}

    constructor() {
        super()

        // ! Testing of API ! //
        const api = new API()
        this.setState({ api })

        var firebase = new FireBase()

        // firebase.logout()
        // var res = firebase.register("jakeposthouwer@gmail.com", "test123")
        firebase.login("jakeposthouwer@gmail.com", "test123")

        setTimeout(() => {
            if (firebase.state.loggedin == true && window.location.pathname == "/") {
                window.location = "/browse"
            }
        }, 1000);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App-content">
                    <NavBar />
                    <Route path='/browse' component={Home}/>
                    <Route path='/series' component={Series} />
                    <Route path='/films' component={Films} />
                    <Route path='/newandpopular' component={NewAndPopular} />
                    <Route path='/mylist' component={MyList} />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;