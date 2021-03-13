import React from 'react';

class List extends React.Component {

    constructor({ data }) {
        super()
        this.state = {list: data, i: 0}
    }

    back() {
        this.state.i--
        if (0 > this.state.i) this.state.i = this.state.list.length-1
        this.forceUpdate()
    }

    next() {
        this.state.i++
        if(this.state.list.length-1 < this.state.i) this.state.i = 0
        this.forceUpdate()
    }

    render() {
        var e = this.state.list[this.state.i]
        if (e == null) return false;
        
        return (
            <div className="movie" style={{ backgroundImage: `url("${e.backdrop_path}")`}}>
                <h2>{e.title}</h2>
                <p>{e.overview}</p>
                <div className="slider">
                    <div className="left" onClick={this.back.bind(this)}><span className="material-icons">navigate_before</span></div>
                    <div className="right" onClick={this.next.bind(this)}><span className="material-icons">navigate_next</span></div>
                </div>
            </div>
        )
    }
}

export default List