import { useEffect } from 'react'

function Welcome(
    {
        setQuizMaster,
        onNext,
        quizMaster,
        setHandleSubmit,
        errorStatus,
        setErrorStatus
    })
{

    const updateQuizMaster = (key, newValue) => {
        setQuizMaster(prevState => ({
            ...prevState,
            [key]: newValue,
        }));
    };

    const handleUserTokenSubmit = (event) => {
        event.preventDefault();
        // Fetch API token
        fetch(`https://opentdb.com/api_token.php?command=request`)
            .then((response) => response.json())
            .then((data) => {
                setErrorStatus("");
                if (!quizMaster.name?.length) { updateQuizMaster('name', 'Jay') }
                updateQuizMaster("token", data.token);
                setHandleSubmit({func: onNext, btnTitle: 'Continue', disabled: false});
            })
            .catch((error) => {
                setErrorStatus("No API token for you! " + error.message);
            });
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setHandleSubmit({func: handleUserTokenSubmit, btnTitle: 'Submit', disabled: false}) }, []);


    return (
        <div className="welcomeContainer">
            <div className="writeupContainer">
                <h1>Welcome home, Quiz Master!</h1>
                <hr/>
                <p>
                    This is a simple React application.
                    <br/>
                    The purpose of this application is to create and play quiz games using the <a href="https://opentdb.com/">Open Trivia Database</a> API.
                    <br/>
                    We hope you have fun!
                </p>
                <ol>
                    <li>Quiz Master, enter your name and we'll give you a key.</li>
                    <li>Choose a category, difficulty, and amount. There are limits; we'll let you know.</li>
                        <ol className="subList">
                            <li>If you choose more than one category or over 50 questions, it will take an additional 5 seconds to complete the data fetch</li>
                        </ol>
                    <li>You'll be able to create your teams while the timer counts down.</li>
                        <ol className="subList">
                            <li>Multiple teams can chose the same team token, but the colors will be the unique identifier along with a name.</li>
                            <li>Make certain to set the order of your inputs based on the order in which you'd like to play.</li>
                        </ol>
                    <li>Your quiz will begin after data is fetched, and teams are chosen.</li>
                        <ol className="subList">
                            <li>Quiz Master, you're in charge of the previous question, next question, and submit button, so that you remain in control of rules we haven't thought about.</li>
                            <li>The Quiz Master can play along as each question is verified and randomized by this site.</li>
                        </ol>
                    <li>Your score will be displayed at the end of the quiz.</li>
                    <li>You can restart the whole process, or part of the process at this point.</li>
                </ol>
            </div>
            {/* <button name="Tutorial" type="button" onClick={ () => {} }>Wanna see the tutorial?</button> */}
            <div className='tokenFormContainer'>
                { quizMaster?.token ? (
                    <p className="submitResult">
                        Quiz Master { quizMaster.name }, your token is:{" "}
                        <span className="userTokenContainer">{ quizMaster.token }</span>
                        <br />
                        Press continue button to advance.
                    </p>
                ) : (
                    <form id="quizMasterForm" name="quizMasterForm" onSubmit={ handleUserTokenSubmit }>
                        <label htmlFor="quizMaster">
                            Please enter your name
                            <br/>
                            <input
                                type="text"
                                id="quizMaster"
                                name="quizMaster"
                                onChange={ (event) => updateQuizMaster('name', event.target.value) }
                                required
                            />
                        </label>
                        <p>Hit the submit button to get an API token</p>
                    </form>
                )}
                {errorStatus && <p>{ errorStatus }</p>}
            </div>
        </div>
    )
}

export default Welcome;