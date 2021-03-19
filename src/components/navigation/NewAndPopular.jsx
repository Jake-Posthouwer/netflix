import React from 'react';
import List from '../util/list';
import API from '../api';

class NewAndPopular extends React.Component {
    state = { genres: [], api: new API }
    
    constructor() {
        super()
        var api = this.state.api

        // Populair movies
        api.getMovies({
            sort_by: "popularity.desc"
        }).then((data) => {
            this.state.genres.push({ title: "Popularity", data })
            this.forceUpdate()
        })

        api.getMovies({
            sort_by: "primary_release_date.desc"
        }).then((data) => {
            this.state.genres.push({ title: "New", data })
            this.forceUpdate()
        })

        api.getMovies({
            sort_by: "revenue.desc"
        }).then((data) => {
            this.state.genres.push({ title: "Revenue", data })
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div style={{marginTop: "100px"}}>
                {
                    this.state.genres.map((v, i) => {
                        return (
                            <div className="genre">
                                <h5>{v.title}</h5>
                                <List data={v.data} className="small" featured={false} api={this.state.api} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default NewAndPopular;