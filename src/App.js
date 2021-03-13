import React from "react";
import './css/App.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import Home from './components/navigation/Home';
import Series from './components/navigation/Series';
import Films from './components/navigation/Films';
import MyList from './components/navigation/MyList';
import NewAndPopular from './components/navigation/NewAndPopular';
import API from './components/api';

class App extends React.Component {
    constructor() {
        super()

        // ! Testing of API ! //
        const api = new API()
        this.setState({ api })

        // api.getPopularMovies().then((data) => {
        //     console.log(data);
        // })
    }

    render() {
        return (
            <BrowserRouter>
            <div className="App-content">
                <NavBar />
                <Route path='/' component={Home} exact/>
                <Route path='/series' component={Series} />
                <Route path='/films' component={Films} />
                <Route path='/newandpopular' component={NewAndPopular} />
                <Route path='/mylist' component={MyList} />
            </div>
            </BrowserRouter>
        )
    }
}

export default App;