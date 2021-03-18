import React from 'react';

const footer = () => {
    var clicks = 0

    var click = () => {
        clicks++

        if(clicks >= 10) {
            var audio = new Audio("https://www.soundboard.com/mediafiles/23/232857-e4f12a25-db94-4bb0-9cdb-dd213cbe0ce8.mp3")

            audio.play()
        }
    }

    return (
        <footer>
            <p>Made by <a href="https://tazio.nl">Tazio</a> & Jake Posthouwer</p>
            <p onClick={click}>Copyright © 2021</p>
            <p>Terms of Use || Privacy Policy</p>
        </footer>
    )
}

export default footer;