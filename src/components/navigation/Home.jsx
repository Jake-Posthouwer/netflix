import React from 'react';
import List from '../util/list';
import API from '../api';


class Home extends React.Component {
    state = {}

    constructor() {
        super()
        var api = new API()
        var arr = []
        var testMovies = [110, 120] // TEST MOVIE ID

        for (let i = 0; i < testMovies.length; i++) {
            const movie = testMovies[i];
            api.getMovie(movie).then((data) => {
                arr.push(data)
                this.forceUpdate()
            })
        }


        this.state.movies = arr
    }
    render() {
        return (
            <div>
                <List data={this.state.movies} />
            </div>
        )
    }
}

export default Home;