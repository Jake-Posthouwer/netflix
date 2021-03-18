import React from 'react';

import API from '../api';

import PopupMovie from '../popups/movie';

class List extends React.Component {

    constructor({ data, featured=false, className="" }) {
        super()
        this.ref = React.createRef();
        this.state = {
            list: data,
            i: 0,
            featured,
            api: new API(),
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

    onHover(e) {
        var wait = setTimeout(async () => {
            function getOffset(el) {
                var _x = 0;
                var _y = 0;
                while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                return { top: _y, left: _x };
            }

            var pos = getOffset(e.target)
            var x = pos.left,
                y = pos.top;

            var data = await this.state.api.getMovie(e.target.dataset.id)
            // this.state.popup({ x, y, data })
            new PopupMovie({x, y, data})
        }, 250);
        this.setState({wait})
    }

    onLeave() {
        var { wait } = this.state
        
        clearTimeout(wait)

        this.setState({wait: null})
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
        if (this.state.featured == true) {
            var e = this.state.list[this.state.i]
            if (e == null) return false;
            var multiple = false

            if (this.state.list.length > 1) {
                multiple = true
            }
            return (
                <div className={["movie", this.state.parentClass].join(" ")}>
                    <img src={e.backdrop} alt="featured film" />
                    <div className="liniar-gradient"></div>
                    <div className="info">
                        <h2>{e.title}</h2>
                        <button>Play</button>
                    </div>
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

            if (this.state.list.length > 10) multiple = true

            return (
                <div ref={this.ref} className={["list", this.state.parentClass].join(" ")} onMouseDown={this.onMouseDown.bind(this)} onMouseMove={this.onMouseDrag.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
                    {(this.state.list) ? this.state.list.map((v, i) => {
                        return (
                            <div className="movie" data-id={v.id} key={i} onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.onLeave.bind(this)}>
                                <img src={v.backdrop.toString()} alt="Movie about things" />
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