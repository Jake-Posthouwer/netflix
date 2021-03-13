import React from 'react';
import List from '../util/list';
import API from '../api';


class Home extends React.Component {
    state = {featured: []}

    constructor() {
        super()
        var api = new API()

        this.state.api = api
        this.featuredMovies([110, 120])
        this.getGenre("Horror")

        setTimeout(() => {
            this.forceUpdate()
        }, 1000);
    }

    featuredMovies(movies) {
        var api = this.state.api
        var arr = []

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i];
            api.getMovie(movie).then((data) => {
                arr.push(data)
            })
        }

        this.state.featured = arr
    }

    getGenre(genre) {
        var api = this.state.api
        var genreTitle = genre

        api.getGenres().then((data) => {
            for (let i = 0; i < data.length; i++) {
                const genre = data[i];
                if (genre.name == genreTitle) {
                    api.getMovies({ with_genres: genre.id }).then((data) => {
                        this.state[genreTitle] = data
                    })
                }
            }
        })
    }

    render() {
        return (
            <div>
                <div className="featured">
                    <List data={this.state.featured} featured={true} api={this.state.api} />
                </div>
                <div className="genre">
                    <h5>Horror</h5>
                    {(this.state.Horror) ? <List data={this.state.Horror} className="small" featured={false} api={this.state.api} /> : ""}
                </div>
            </div>
        )
    }
}

export default Home;