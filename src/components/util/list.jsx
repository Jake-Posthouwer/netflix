import React from 'react';
import API from '../api';

class List extends React.Component {

    constructor({ data, featured=false, api, className="" }) {
        super()
        this.state = { list: data, i: 0, featured, api, parentClass: className}
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

    scroll(data) {
        var e = data.target,
            type = e.offsetParent.classList[0],
            slider = e.offsetParent.offsetParent.parentElement

        if (type == "left") {
            slider.scrollTo({
                left: slider.scrollLeft - 500,
                behavior: "smooth"
            })
        } else {
            slider.scrollTo({
                left: slider.scrollLeft + 500,
                behavior: "smooth"
            })
        }
    }

    render() {
        var api = this.state.api
        
        if (this.state.featured == true) {
            var e = this.state.list[this.state.i]
            if (e == null) return false;
            var multiple = false

            if (this.state.list.length > 1) {
                multiple = true
            }
            return (
                <div className={["movie",this.state.parentClass].join(" ")} style={{ backgroundImage: `url("${e.backdrop_path}")` }}>
                    <h2>{e.title}</h2>
                    <p>{e.overview}</p>
                    {multiple ? (
                        <div className="slider">
                            <div className="left" onClick={this.back.bind(this)}><span className="material-icons">navigate_before</span></div>
                            <div className="right" onClick={this.next.bind(this)}><span className="material-icons">navigate_next</span></div>
                        </div>
                    ) : ""}
                </div>
            )
        } else if (this.state.featured == false) {
            var multiple = false

            if (this.state.list.length > 10) {
                multiple = true
            }

            return (
                <div className={["list", this.state.parentClass].join(" ")}>
                    {(this.state.list) ? this.state.list.map((v, i) => {
                        return (
                            <div className="movie" data-id={v.id}>
                                <img src={api.getImage(v.backdrop_path)} alt="" />
                                <h5>{v.title}</h5>
                            </div>
                        )
                    }) : ""}
                    {multiple ? (
                        <div className="slider">
                            <div className="left" onClick={this.scroll.bind(this)}><span className="material-icons">navigate_before</span></div>
                            <div className="right" onClick={this.scroll.bind(this)}><span className="material-icons">navigate_next</span></div>
                        </div>
                    ) : ""}
                </div>
            )
        }
    }
}

export default List