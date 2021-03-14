import React from 'react';
import API from '../api';

class List extends React.Component {

    constructor({ data, featured=false, api, className="" }) {
        super()
        this.ref = React.createRef();
        this.state = {
            list: data,
            i: 0,
            featured,
            api,
            parentClass: className,
            isScrolling: false, clientX: 0
        }
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
                left: slider.scrollLeft - 1600,
                behavior: "smooth"
            })
        } else {
            slider.scrollTo({
                left: slider.scrollLeft + 1600,
                behavior: "smooth"
            })
        }

    }

    // * Drag feature * //
    onMouseDown(e) {
        this.setState({
            ...this.state, isScrolling: true,clientX: e.clientX
        });
    }

    onMouseUp() {
        this.setState({ ...this.state, isScrolling: false });
    }

    onMouseDrag(e) {
        const { clientX } = this.state;

        if (this.state.isScrolling) {
            var x = this.ref.current.scrollLeft - e.clientX + clientX
            this.ref.current.scrollLeft = x;
            this.state.clientX = e.clientX;
        }
    }

    render() {
        var { api } = this.state
        
        if (this.state.featured == true) {
            var e = this.state.list[this.state.i]
            if (e == null) return false;
            var multiple = false

            if (this.state.list.length > 1) {
                multiple = true
            }
            return (
                <div className={["movie",this.state.parentClass].join(" ")} style={{ backgroundImage: `url("${e.backdrop}")` }}>
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
                <div ref={this.ref} className={["list", this.state.parentClass].join(" ")} onMouseDown={this.onMouseDown.bind(this)} onMouseMove={this.onMouseDrag.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                    {(this.state.list) ? this.state.list.map((v, i) => {
                        return (
                            <div className="movie" data-id={v.id}>
                                <img src={v.backdrop} alt="" />
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