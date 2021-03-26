import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Cookies from 'universal-cookie';
import Crypt from './crypt';

var config = {
    apiKey: "AIzaSyDHxcphkKncNWZmHDGzPQrkW-i1RMw0tnE",
    authDomain: "netflix-7b382.firebaseapp.com",
    databaseURL: "https://netflix-7b382-default-rtdb.firebaseio.com",
    projectId: "netflix-7b382",
    storageBucket: "netflix-7b382.appspot.com",
    messagingSenderId: "899340125205",
    appId: "1:899340125205:web:541bc07596d52220033a1c"
};

firebase.initializeApp(config);

class FireBase {
    constructor(userID) {
        var db = firebase.firestore()
        var auth = firebase.auth()
        var loggedin = false

        const cookies = new Cookies(document.cookie);
        const crypt = new Crypt();

        var cookieUID = cookies.get("uid")
        
        if (cookieUID != null) {
            userID = crypt.decrypt(cookieUID)
            loggedin = true
        }
        
        this.state = {
            db,
            auth,
            userID,
            loggedin: loggedin || false,
            collection: {
                users: db.collection("users")
            }
        }
    }

    async login(email, password) {
        if (this.state.loggedin) return true

        var auth = this.state.auth

        var response = await auth.signInWithEmailAndPassword(email, password).catch((error) => { return false })

        if (response && response.user) {
            this.state.loggedin = true
            this.state.userID = response.user.uid
            return true
        } else {
            return false
        }
    }

    async register(email, password) {
        if (this.state.loggedin) return true
        var auth = this.state.auth

        var response = await auth.createUserWithEmailAndPassword(email, password)
        this.state.userID = response.user.uid

        const cookies = new Cookies(document.cookie);
        const crypt = new Crypt();

        cookies.set("uid", crypt.encrypt(this.state.userID));

        return true
    }

    async logout() {
        if (!this.state.loggedin) return false

        var auth = this.state.auth
        var response = await auth.signOut()

        return true
    }

    async getUsers() {
        var users = this.state.collection.users
        var response = await users.doc(this.state.userID).collection("account").get()
        return response.docs
    }

    async getUser(name) {
        var users = await this.getUsers()

        if (typeof name !== "string" && typeof name !== "number") return console.log("This is a none recognized type of user");

        var obj = {}

        await users.forEach(v => {
            var data = v.data()
            if (typeof name == "string") {
                if (data.name == name) {
                    obj = { data, id: v.id }
                }
            } else if (typeof name == "number") {
                if (v.id == name) {
                    obj = { data, id: v.id }
                }
            }
        });

        return obj
    }
}

export default FireBase;