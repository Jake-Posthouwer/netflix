import React from 'react';
import List from '../util/list';
import API from '../api';
import PopupMovie from '../popups/movie';


class Home extends React.Component {
    state = {featured: []}

    constructor() {
        super()
        var api = new API()

        this.state.api = api
        
        this.featuredMovies([587807])
        this.getGenre("Horror")
        this.getGenre("Action")
        this.getGenre("War")

        setTimeout(() => {
            this.forceUpdate()
        }, 1000);
    }

    popup(data) {
        this.setState({popup: data})
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
                {this.state.popup ? <div id="popups"><PopupMovie data={this.state.popup}/></div> : ""}
                <div className="featured">
                    <List data={this.state.featured} featured={true} api={this.state.api} />
                </div>
                <div className="genre first">
                    <h5>Horror</h5>
                    {(this.state.Horror) ? <List data={this.state.Horror} popup={this.popup.bind(this)} className="small" featured={false} api={this.state.api} /> : ""}
                </div>
                <div className="genre">
                    <h5>Action</h5>
                    {(this.state.Action) ? <List data={this.state.Action} popup={this.popup.bind(this)} className="small" featured={false} api={this.state.api} /> : ""}
                </div>
                <div className="genre">
                    <h5>War</h5>
                    {(this.state["War"]) ? <List data={this.state["War"]} popup={this.popup.bind(this)} className="small" featured={false} api={this.state.api} /> : ""}
                </div>
            </div>
        )
    }
}

export default Home;