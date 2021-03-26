import React from 'react';
import List from '../builder/list';
import API from '../util/api';

class Series extends React.Component {

    constructor() {
        super()

        this.state = {
            api: new API(),
            list: []
        }
        
        this.featuredMovies([530915])

        this.getGenres(["Documentary", "Crime", "Kids"])

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

    getGenre(str) {
        var api = this.state.api
        var arr = []

        api.getTVGenres().then((data) => {
            for (let i = 0; i < data.length; i++) {
                const genre = data[i];
                if (genre.name == str) {
                    api.getTvs({ with_genres: genre.id }).then((data) => {
                        this.state.list[str] = data
                    })
                }
            }
        })
    }

    render() {
        console.log(this.state.list);
        return (
            <div>
                <div className="featured">
                    <List data={this.state.featured} featured={true} filter={true} />
                </div>
            </div>
        )
    }
}

export default Series;