import { useState } from 'react';
import restartArrow from '/buttons/restartArrow.svg';
import backArrow  from '/buttons/backArrow.svg';
import prevArrow  from '/buttons/prevArrow.svg';
import nextArrow  from '/buttons/nextArrow.svg';

function FooterControls({
        noop,
        currentFormId,
        currentPage,
        setCurrentPage,
        setQuizMaster,
        requestTimer,
        setRequestTimer,
        setQuestions,
        setCurrQuestion,
        handleSubmit,
        setHandleSubmit,
        onPrev,
        onNext,
        errorStatus,
        setErrorStatus
    })
{
    // button display states
    const showRestartBtn = currentPage !== 'welcome'
    const showBackBtn = currentPage !== 'welcome'
    const showPrevQuestionBtn = currentPage === 'quiz'
    const showNextQuestionBtn = currentPage === 'quiz'

    // prompt display
    const [showResetPrompt, setShowResetPrompt] = useState(false);

    // reset helper functions
    const ruinEverything = () => {
        setQuizMaster({name: '', token: ''});
        setRequestTimer(null);
        setQuestions([]);
        setCurrQuestion(0);
        setHandleSubmit({});
        alert("You've ruined EVERYTHING! You're the problem.");
        setErrorStatus('');
        setShowResetPrompt(false);
        setCurrentPage('welcome');
    }

    const resetQuiz = () => {
        setCurrentPage('selection');
        setErrorStatus('');
        setQuestions([]);
    }
    
    const cancel = () => {

        setShowResetPrompt(false);
    }

    

    return (
        <div className="buttonContainer">
            {showResetPrompt && (
                /* this only shows up once if you push the button. I'm ok w/ inline here*/
                <div id="resetPrompt">
                    <h3 style={{ fontWeight: 'bold', color: '#de004a' }}>
                        Do you want to restart all the way over, including reselecting a Quiz Master?
                    </h3>
                    <button id="ruinEverything" onClick={ ruinEverything } title="Hit this if you\'re some sorta jerk.">
                        Yes, I want to ruin everything, like a big dumb jerk.
                    </button>
                    <button id="backToQuizSelection" onClick={ resetQuiz } title="Hit this to go back to the question selection page">
                        Dude, chill. I just want different questions
                    </button>
                    <button id="nvm" onClick={ cancel }>Never Mind, I'm a super cool person.</button>
                </div>
            )}
            <div>
                { showRestartBtn && (
                    <input
                        type="image"
                        src={ restartArrow }
                        onClick={ () => setShowResetPrompt(true) }
                        title="Press to, IDK, ruin everything... Jerk."
                        alt="Restart"
                    />
                )}
            </div>
            <div>
                { showBackBtn && (
                    <input
                        type="image"
                        src={ backArrow }
                        onClick={ onPrev }
                        title="Press to go to previous page"
                        alt="Back"
                    />
                )}
            </div>
            <div>
                { showPrevQuestionBtn && (
                    <input
                        type="image"
                        src={ prevArrow }
                        onClick={ noop }
                        title="Press to go to previous question"
                        alt="Previous Question"
                    />)
                }
            </div>
            <div>
                <button
                    type="submit"
                    onClick={ handleSubmit.func ?? onNext }
                    alt={ handleSubmit.btnTitle }
                    form={ currentFormId }
                >
                    { requestTimer ? `${requestTimer.totalSeconds}` : `${handleSubmit.btnTitle}` || 'Go to next step' }
                </button>
            </div>
            <div>
                { showNextQuestionBtn && (
                    <input
                        type="image"
                        src={ nextArrow }
                        onClick={ noop }
                        title="Press to go to next question"
                        alt="Next Question">
                    </input>
                )}
            </div>
            { errorStatus && <p className="errorMessage">{ errorStatus }</p> }
        </div>
    )

}

export default FooterControls;