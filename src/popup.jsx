import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { getCSWordOfDay } from "cs-wiki"
import './Popup.css';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'

library.add(faVolumeUp)

function Popup() {
    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [date, setDate] = useState("");
    const [speaking, setSpeaking] = useState(false); // new state variable to store the speaking state

    useEffect(() => {
        const fetchedWordOfTheDay = getCSWordOfDay();
        setWord(fetchedWordOfTheDay.term);
        setDefinition(fetchedWordOfTheDay.definitions[0]);
        const today = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString("en-US", options);
        setDate(dateString);
    }, []);

    const speakWord = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(word);
        synth.speak(utterance);
    };

    return (
        <div>
            <h1 id="title">Computer Science Word of the Day <br></br> <span id="date">{date}</span></h1>
            <hr width="120"></hr>
            <div id="container">
                <div id="wordContainer">
                    <p id="chosen-word">{word}</p>
                    <button id="play-sound" onClick={speakWord} className="speaker-icon">
                        <FontAwesomeIcon icon={faVolumeUp} />
                    </button>
                </div>
            </div>

            <hr width="80%"></hr>
            <div id="definition-area">
                <p>Definition:</p>
                <p id="defin">{definition}</p>
            </div>
            <footer className="footer">
                <p>Made with ❤️ by Zaid</p>
            </footer>
        </div>
    );
}

render(<Popup />, document.getElementById('react-target'));
