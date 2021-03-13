import axios from "axios";
import dotenv from "dotenv";

class API {
    state = {
        "BASE": {
            "API": "https://api.themoviedb.org/3/movie/",
            "IMG": "https://image.tmdb.org/t/p/original"
        },
        "KEY": process.env.REACT_APP_API_KEY,
        "LANG": "en-US"
    }

    constructor() {
    }

    build(url, lang = this.state.LANG) {
        const param = {
            "api_key": this.state.KEY,
            "language": lang
        }

        var str = url,
            o = 0

        for (var i in param) {
            const e = param[i];

            if (o == 0) str += "?" + i + "=" + e
            else str += "&" + i + "=" + e
            o++
        }

        return str
    }

    /**
     * Get image url
     * @param {string} link - The .png you want
     * @returns {string} Full link
     */
    getImage(link) {
        if (typeof link != "string") return false;
        if (link.charAt(0) != "/") link = "/" + link;
        return this.state.BASE.IMG + link
    }

    /**
     * Get a certain movie
     * @param {string} id - The ID of the movie
     * @returns {object} Result object
     */
    async getMovie(id) {
        const response = await axios.get(this.build(this.state.BASE.API + id))

        var data = response.data

        if (data.success == false) return false

        // * Make image path correct
        data.backdrop_path = this.getImage(data.backdrop_path)
        data.poster_path = this.getImage(data.poster_path)

        return data
    }

    /**
     * ! VERY UNSTABLE (XML Not found error)
     * Get random movies
     * @param {int} amount - Amount of movies that will be returned
     * @returns {array} Results array
     */
    async getRandomMovies(amount=10) {
        var data = [],
            min = 100,
            max = 700,
            accepted = []

        for (let i = 0; i <= amount; i++) {
            var random = Math.round(Math.random() * (max - min + 1) + min)

            // * Make sure the movies aren't the same
            while(accepted.includes(random)) {
                random == Math.round(Math.random() * (max - min + 1) + min)
            }

            this.getMovie(random).then((d) => {
                data.push(d)
            }).catch((err) => {
                // * Movie doesn't exist
                i--
            })
        }

        return data
    }

    /**
     * Get the popular movies right now
     * @returns {object} Results array
     */
    async getPopularMovies() {
        const response = await axios.get(this.build(this.state.BASE.API + "popular"))

        return response.data.results
    }
}
 
export default API;