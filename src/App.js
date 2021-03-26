import React from "react";
import './css/App.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

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

class App extends React.Component {
    state = {}

    constructor() {
        super()

        // ! Testing of API ! //
        const api = new API()
        this.setState({ api })

        var firebase = new FireBase()

        firebase.register("jakeposthouwer@gmail.com", "123")

        // if (firebase.login("tazio2003@gmail.com", "123")) {
        //     console.log("Logged in!");
        // } else {
        //     console.log("Wrong password");
        // }

        firebase.getUser(0).then((v) => {
            console.log(v);
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App-content">
                    <NavBar />
                    <Route path='/browse' component={Home} exact/>
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