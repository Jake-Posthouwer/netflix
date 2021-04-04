import React from 'react';
import List from '../builder/list';
import API from '../util/api';

class Series extends React.Component {

    constructor() {
        super()

        this.state = {
            api: new API(),
            list: [],
            search: null
        }
        
        this.featured([530915])

        // this.getGenres(["Documentary"])
        this.getGenre("Documentary")

        setTimeout(() => {
            this.forceUpdate()
        }, 1000);
        
    }

    featured(movies) {
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

    async search({ title, raw }) {
        var api = this.state.api

        console.log(this.state.api);

        await api.getTVGenres().then((data) => {
            for (let i = 0; i < data.length; i++) {
                const genre = data[i];
                if (genre.name == title) {
                    api.getTvs({ with_genres: genre.id }).then((data) => {
                        this.state.search = data
                        console.log(this.state.search);
                    })
                }
            }
        })
        this.forceUpdate()
    }

    async getGenres(array) {
        for (let i = 0; i < array.length; i++) {
            const genre = array[i];
            await this.getGenre(genre)
        }
    }

    getGenre(str, order="list") {
        var api = this.state.api
        api.getTVGenres().then((data) => {
            for (let i = 0; i < data.length; i++) {
                const genre = data[i];
                if (genre.name == str) {
                    api.getTvs({ with_genres: genre.id }).then((data) => {
                        console.log(data);
                        if (order != "list") this.state[order] = data
                        else this.state[order][str] = data
                    })
                }
            }
        })
    }

    render() {
        console.log(this.state.search);
        return (
            <div>
                {
                    (this.state.search) ?
                        <List history={["series", this.state.search.title]} data={this.state.search.data} featured={false} slider={false} movieType={false} className={"search"} /> :
                        <div className="featured">
                            <List data={this.state.featured} featured={true} filter={true} onSelectClick={this.search.bind(this)} />
                        </div>
                }
            </div>
        )
    }
}

export default Series;