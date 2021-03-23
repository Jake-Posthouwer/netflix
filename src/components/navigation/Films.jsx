import React from 'react';
import List from '../util/list';
import API from '../api';

class Films extends React.Component {

    constructor() {
        super()

        this.state = {
            api: new API()
        }

        this.featuredMovies([530915])

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

    render() {
        return (
            <div>
                <div className="featured">
                    <List data={this.state.featured} featured={true} filter={true} />
                </div>
            </div>
        )
    }
}

export default Films;