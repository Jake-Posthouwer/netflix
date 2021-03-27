import FireBase from './firebase';

class User {
    constructor(id) {
        var firebase = new FireBase()

        if (firebase.state.loggedin != true) {
            this.state = {}
        } else {
            if (id == null) id = firebase.state.userID

            firebase.getUser(id).then((v) => {
                firebase.getImage(v.data.image).then((e) => {
                    v.data.image = e
                    this.state = {
                        ...v.data
                    }
                })
            })
        }
    }

    get() {
        return (this.state.name == null) ? null : this.state
    }

    image() {
        return this.state.image
    }

    name() {
        return this.state.name
    }
}

export default User