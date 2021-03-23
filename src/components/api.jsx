/**
 * @file
 * API connection with "The Movie Database"
 */


import axios from "axios";

class API {
    state = {
        "BASE": {
            "API": `https://api.themoviedb.org/`,
            "IMG": "https://image.tmdb.org/t/p/original"
        },
        "KEY": process.env.REACT_APP_API_KEY,
        "LANG": "en-US",
        "VERSION": 3
    }

    build(url, type = "movie", params = {}, includeBase = true, lang = this.state.LANG) {
        const param = {
            "api_key": this.state.KEY,
            "language": lang,
            ...params
        }

        var str = url,
            o = 0

        for (var i in param) {
            const e = param[i];

            if (o == 0) str += "?" + i + "=" + e
            else str += "&" + i + "=" + e
            o++
        }

        if (includeBase) {
            str = this.state.BASE.API + this.state.VERSION + "/" + type + "/" + str
        }

        return str
    }

    ajust(arr = []) {
        var items = arr
        var oneItem = false
        if (items[0] == null) {
            items = [items]
            oneItem = true
        }

        var change = {
            "backdrop_path": {
                replace: "backdrop",
                img: true
            },
            "poster_path": {
                replace: "poster",
                img: true
            },
            "original_language": {
                replace: "language"
            },
            "original_title": {
                delete: true
            },
            "vote": {
                object: true,
                delete: false,
                items: ["vote_average", "vote_count"],
                to: ["average", "count"]
            }
        }
        
        for (let i = 0; i < items.length; i++) {
            const data = items[i];

            for (const key in change) {
                const obj = change[key]
                if (obj.replace) {
                    items[i][obj.replace] = (obj.img) ? this.getImage(data[key]) : data[key]
                }

                if (obj.object == true) {
                    var o = {}

                    for (let j = 0; j < obj.items.length; j++) {
                        const item = obj.items[j];
                        var name = obj.to[j] || obj.items[j];
                        o[name] = items[i][item] || null
                        delete items[i][item]
                    }

                    items[i][key] = o
                }

                if (obj.delete == null || obj.delete == true) {
                    delete items[i][key]
                }
            }
        }

        if (oneItem) {
            return items[0]
        } else {
            return items
        }
    }

    /**
     * Get image url
     * @param {string} link The image you want
     * @returns {string} Full link
     */
    getImage(link) {
        if (typeof link != "string") return false;
        if (link.charAt(0) != "/") link = "/" + link;
        return this.state.BASE.IMG + link
    }

    /**
     * Get a certain movie
     * @param {string} id The ID of the movie
     * @returns {object} Result object
     */
    async getMovie(id) {
        const response = await axios.get(this.build(id))

        var data = response.data

        if (data.success == false) return false

        return this.ajust(data)
    }

    /**
     * Get movies of certain type
     * @param {object} params Add any requested types
     * @see [here](https://developers.themoviedb.org/3/discover/movie-discover) for more information
     * @returns {object}
     */
    async getMovies(params) {
        const response = await axios.get(this.build("movie", "discover", params))

        return this.ajust(response.data.results)
    }
    
    /**
     * Get TV of certain type
     * @param {object} params Add any requested types
     * @see [here](https://developers.themoviedb.org/3/discover/tv-discover) for more information
     * @returns {object}
     */
    async getTvs(params) {
        const response = await axios.get(this.build("tv", "discover", params))

        return this.ajust(response.data.results)
    }

    /**
     * Get random movies
     * @deprecated
     * @param {int} amount Amount of movies that will be returned
     * @returns {array} Results array
     */
    async getRandomMovies(amount = 10) {
        var data = [],
            min = 100,
            max = 700,
            accepted = []

        for (let i = 0; i <= amount; i++) {
            var random = Math.round(Math.random() * (max - min + 1) + min)

            // * Make sure the movies aren't the same
            while (accepted.includes(random)) {
                random = Math.round(Math.random() * (max - min + 1) + min)
            }

            this.getMovie(random).then((d) => {
                data.push(d)
            }).catch((err) => {
                // * Movie doesn't exist
                i--
            })
        }

        return this.ajust(data)
    }

    async getVideos(id) {
        const response = await axios.get(this.build("videos", `movie/${id}`))

        return response.data.results
    }

    async getTrailer(id, type = "youtube") {
        const response = await axios.get(this.build("videos", `movie/${id}`)),
            data = response.data.results;

        for (let i = 0; i < data.length; i++) {
            const video = data[i];
            if (video.site.toLowerCase() == type.toLowerCase()) {
                return video
            }
        }
    }

    /**
     * Get the popular movies right now
     * @see [here](https://developers.themoviedb.org/3/movies/get-popular-movies) for more information
     * @returns {object} Results array
     */
    async getPopularMovies() {
        const response = await axios.get(this.build("popular"))

        return this.ajust(response.data.results)
    }

    /**
     * Get the available genres for movies
     * @see [here](https://developers.themoviedb.org/3/genres/get-movie-list) for more information
     * @returns {array} Genres available
     */
    async getMovieGenres() {
        const response = await axios.get(this.build("list", "genre/movie"))

        return response.data.genres
    }

    /**
     * Get the available genres for TV
     * @see [here](https://developers.themoviedb.org/3/genres/get-tv-list) for more information
     * @returns {array} Genres available
     */
    async getTVGenres() {
        const response = await axios.get(this.build("list", "genre/tv"))

        return response.data.genres
    }
}

 
export default API;