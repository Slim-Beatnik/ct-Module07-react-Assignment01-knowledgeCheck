import { useState } from 'react';
import RestartArrow from './buttons/RestartArrow.jsx';
import BackArrow from './buttons/BackArrow.jsx';
import DirArrow from './buttons/DirArrow.jsx';


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
        setQuestions([]);
        setCurrQuestion(0);
        setHandleSubmit({});
        setRequestTimer(noop);
        alert("You've ruined EVERYTHING! You're the problem.");
        setErrorStatus('');
        setCurrentPage('welcome');
        setShowResetPrompt(false);
    }

    const resetQuiz = () => {
        setCurrentPage('selection');
        setErrorStatus('');
        setQuestions([]);
        setShowResetPrompt(false);
    }
    
    const cancel = () => {
        setShowResetPrompt(false);
    }

    

    return (
        <div className="buttonContainer">
            { showResetPrompt && (
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
                    <RestartArrow
                        bgColor="#b11313"
                        arrowColor="#000000cc"
                        onClick={ () => setShowResetPrompt(true) }
                    />
                )}
            </div>
            <div>
                { showBackBtn && (
                    <BackArrow
                        color="#aceeeeee"
                        onClick={ onPrev }
                    />
                )}
            </div>
            <div>
                { showPrevQuestionBtn && (
                    <DirArrow
                        pointsRightBool = { false }
                        arrowColor="#000"
                        shadowColor="#aceeee99"
                        onClick={ noop }
                    />
                )}
            </div>
            <div>
                <div>
                        { errorStatus && <p className="errorMessage">{ errorStatus }</p> }
                </div>
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
                    <DirArrow
                        pointsRightBool = { true }
                        arrowColor="#000"
                        shadowColor="#aceeee99"
                        onClick={ noop }
                    />
                )}
            </div>
        </div>
    )

}

export default FooterControls;