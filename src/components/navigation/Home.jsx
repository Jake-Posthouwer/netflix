import React from 'react';
import List from '../builder/list';
import API from '../util/api';

class Home extends React.Component {
    state = {featured: [], genres: []}

    constructor() {
        super()
        var api = new API()

        this.state.api = api
        
        this.featuredMovies([530915])
        this.getGenres(["Horror", "Action", "War", "Animation"])

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

    async getGenres(array) {
        for (let i = 0; i < array.length; i++) {
            const genre = array[i];
            await this.getGenre(genre)
        }
    }

    getGenre(genre) {
        var api = this.state.api
        var genreTitle = genre

        api.getMovieGenres().then((data) => {
            for (let i = 0; i < data.length; i++) {
                const genre = data[i];
                if (genre.name == genreTitle) {
                    api.getMovies({ with_genres: genre.id }).then((data) => {
                        this.state.genres.push({title: genreTitle, data})
                    })
                }
            }
        })
    }

    render() {
        return (
            <div>
                <div className="featured">
                    <List data={this.state.featured} featured={true} />
                </div>
                {
                    this.state.genres.map((v, i) => {
                        return (
                            <div className={(i == 0) ? "genre first" : "genre"} key={i.toString()}>
                                <h5>{v.title}</h5>
                                <List data={v.data} className="small" featured={false}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Home;