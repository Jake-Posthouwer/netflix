import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

class PopupMovie extends React.Component {

    constructor({ data }) {
        super()
        console.log(data);
        this.state = { x: data.x, y: data.y, data: data.data }
        console.log(this.state);
    }

    delete(e) {
        var wait = setTimeout(() => {
            // this.setState({ empty: true })
        }, 250);

        this.setState({wait})
    }

    enter() {
        if (!this.state.wait) return
        clearTimeout(this.state.wait)
        this.setState({wait: null})
    }

    render() {
        var x = this.state.x,
            y = this.state.y,
            data = this.state.data;
        
        if(this.state.empty == true) return;
        return (
            <div className="movie" style={{top: y, left: x}} onMouseLeave={this.delete.bind(this)} onMouseEnter={this.enter.bind(this)}>
                {<img src={data.backdrop} alt="image" />}
                <h2>{data.title}</h2>
                <div className="buttons">
                    <div className="smallbutton important"><span className="material-icons">play_arrow</span></div>
                    <div className="smallbutton"><span className="material-icons">add</span></div>
                    <div className="smallbutton"><span className="material-icons">thumb_up</span></div>
                    <div className="smallbutton"><span className="material-icons">thumb_down</span></div>
                    <div className="smallbutton"><span className="material-icons">expand_more</span></div>
                </div>
                <p className="match">
                    85% Match
                </p>
                <div className="categories">
                    {(data.genres) ? data.genres.map((v, i) => {
                        return (<p key={i}>{v.name}</p>)
                    }) : ""}
                </div>
            </div>
        );
    }
}
 
export default PopupMovie;