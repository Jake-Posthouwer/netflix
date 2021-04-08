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
        
        const path = window.location.pathname.split("/").slice(1)

        if (path[1] != null) {
            var title = path[1].replaceAll("%20", " ")
            this.state.api.getTVGenres().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const genre = data[i];
                    if (genre.name.toLowerCase() == title.toLowerCase()) {
                        this.state.api.getTvs({ with_genres: genre.id }).then((data) => {
                            this.state.search = {title, data}
                        })
                    }
                }
            })
        }

        this.getGenres(["Documentary"])
        // this.getGenre("Documentary")

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

    async search({ title }) {
        var url = window.location.origin + "/" + window.location.pathname.split("/").slice(1)[0] + `/${title.toLowerCase()}`;
        window.location.href = url;
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
                        if (order != "list") this.state[order] = data
                        else this.state[order][str] = data
                    })
                }
            }
        })
    }

    render() {
        
        return (
            <div>
                {
                    (this.state.search) ?
                        <List history={["series", this.state.search.title]} data={this.state.search.data} featured={false} slider={false} movieType={false} className={"search"} /> :
                        <div className="featured">
                            <List data={this.state.featured} featured={true} filter={true} movieType={false} onSelectClick={this.search.bind(this)} />
                        </div>
                }
                {
                    (!this.state.search) ? this.state.list.map((v, i) => {
                        return (
                            <div className={(i == 0) ? "genre first" : "genre"} key={i.toString()}>
                                <h5>{v.title}</h5>
                                <List data={v.data} movieType={true} className="small" featured={false} />
                            </div>
                        )
                    }) : ""
                }
            </div>
        )
    }
}

export default Series;