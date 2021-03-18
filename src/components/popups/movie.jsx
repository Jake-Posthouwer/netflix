import React from 'react';
import { render } from 'react-dom';

class PopupMovie extends React.Component {

    constructor({ x, y, data }) {
        super()
        this.state = { x, y, data }

        render(this.render(), document.getElementById("popups"))
        var doc = document.getElementsByClassName("App-content")[0]

        doc.onscroll = this.scroll
    }

    delete(e, force = false) {
        if (force) return render(<></>, document.getElementById("popups"))
        if (e.relatedTarget && e.relatedTarget.classList && e.relatedTarget.classList.contains("movie")) return

        var wait = setTimeout(() => {
            render(<></>, document.getElementById("popups"))
            this.setState({ wait: null })
        }, 250);

        this.setState({wait})
    }

    scroll(e) {
        render(<></>, document.getElementById("popups"))
    }

    enter() {
        if (!this.state.wait) return
        clearTimeout(this.state.wait)
        this.setState({ wait: null })
    }

    render() {
        var x = this.state.x,
            y = this.state.y,
            data = this.state.data;
        
        if(this.state.empty == true) return;
        return (
            <div className="movie" style={{top: y, left: x}} onMouseLeave={this.delete.bind(this)} onMouseEnter={this.enter.bind(this)}>
                {<img src={data.backdrop || "./img/no-cover.jpg"} alt="image" />}
                <h2>{data.title}</h2>
                <div className="buttons">
                    <div className="smallbutton important"><span className="material-icons">play_arrow</span></div>
                    <div className="smallbutton"><span className="material-icons">add</span></div>
                    <div className="smallbutton"><span className="material-icons">thumb_up</span></div>
                    <div className="smallbutton"><span className="material-icons">thumb_down</span></div>
                    <div className="smallbutton"><span className="material-icons">expand_more</span></div>
                </div>
                <p className="match">
                    {data.vote.average * 10}% Rated
                </p>
                <div className="categories">
                    {(data.genres) ? data.genres.map((v, i) => {
                        if (i < 4) return (<p key={i}>{v.name}</p>)
                        else if (i == 4) return (<p>...</p>)
                        else return;
                    }) : ""}
                </div>
            </div>
        );
    }
}
 
export default PopupMovie;