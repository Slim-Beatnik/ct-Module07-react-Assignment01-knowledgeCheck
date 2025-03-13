import { useState } from 'react';
import { ReactComponent as RestartArrow } from '/buttons/restartArrow.svg'
import { ReactComponent as BackArrow } from '/buttons/backArrow.svg'
import { ReactComponent as PrevArrow } from '/buttons/prevArrow.svg'
import { ReactComponent as NextArrow } from '/buttons/nextArrow.svg'



function FooterControls({ currentPage, setCurrentPage, setUserToken, requestTimer, setRequestTimer, setQuestions, setCurrQuestion, handleSubmit, setHandleSubmit, errorStatus, setErrorStatus }) {

    const bypassError = () => {currentPage, requestTimer, setHandleSubmit};

    const [restartBtn, setRestartBtn] = useState(true);
    const [backBtn, setBackBtn] = useState(true);
    const [submitBtn, setSubmitBtn] = useState({  });
    const [prevQuestionBtn, setPrevQuestionBtn] = useState(false);
    const [nextQuestionBtn, setNextQuestionBtn] = useState(false);

    const ruinEverything = () => {
        setUserToken(null);
        setCurrentPage('welcome');
        setRequestTimer(null);
        setQuestions([]);
        setCurrQuestion(null)
        handleSubmit({});
        setErrorStatus('You\'re the problem.');
        console.alert('You\'ve ruined EVERYTHING! ' + { errorStatus })
        setRestartBtn(true);
        setBackBtn(false);
        setSubmitBtn({});
        setPrevQuestionBtn(false);
        setNextQuestionBtn(false);
        setErrorStatus('');
    }

    const getDifferentQs = () => {
        setCurrentPage('selection');
        setQuestions([]);
        return (
            <QuizSelectionForm onNext={() => setCurrentPage("teams")} />
        )
    }

    const promptRuinEverything = (dispBool) => {
        if (dispBool) {
            return (
                // this only shows up once if you push the button. I'm ok w/ inline here
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(5px)' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#de004a' }}>Do you want to restart all the way over, including reselecting a Quiz Master?</h3>
                    <button id="ruinEverything" onClick={ ruinEverything() } title="Hit this is you\'re some sorta jerk.">Yes, I want to ruin everything, like a big dumb jerk.</button>
                    <button id="backToQuizSelection" onClick={ getDifferentQs() } title="Hit this to go back to the question selection page">Dude, chill. I just want different questions</button>
                    <button id="nvm" onClick={ promptRuinEverything(false) }>Never Mind, I'm a super cool person.</button>
                </div>
            )
        } else {
            return;
        }
    }

    const something =() => {
        return
    }

    return (
        <div className="buttonContainer">
            { bypassError && <div>&#128405; Your mom!</div>}
            { restartBtn && <button onClick={ promptRuinEverything(true) } title="Press to, IDK, ruin everything... Jerk." alt="Restart"><RestartArrow /></button> }
            { backBtn && <button onClick={something()} title="Press to go to previous page" alt="Back"><BackArrow /></button> }
            { prevQuestionBtn && <button onClick={ something() } title="Press to go to previous question" alt="Previous Question"><PrevArrow /></button> }
            { submitBtn && <button onClick={something()} alt="Submit">Submit</button> }
            { nextQuestionBtn && <button onClick={ something() } title="Press to go to next question" alt="Next Question"><NextArrow /></button> }
        </div>
    )

}

export default FooterControls;