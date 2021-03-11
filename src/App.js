import React from "react";
import './css/App.css';
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar.jsx';
import Home from './components/navigation/Home.jsx';
import Series from './components/navigation/Series.jsx';
import Films from './components/navigation/Films.jsx';
import MyList from './components/navigation/MyList.jsx';
import NewAndPopular from './components/navigation/NewAndPopular.jsx';


class App extends React.Component {
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