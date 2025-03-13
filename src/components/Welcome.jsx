import { useEffect } from 'react'

function Welcome({ onNext, noop, setQuizMaster, quizMaster, setHandleSubmit, errorStatus, setErrorStatus }) {

    const handleUserTokenSubmit = (event) => {
        event.preventDefault();
        const userName = event.target.quizMaster.value;
        updateQuizMaster('name', userName); // Set quizMaster here
    
    // Fetch API token
        fetch(`https://opentdb.com/api_token.php?command=request`)
            .then(response => response.json())
            .then(data => {
                setErrorStatus('');
                updateQuizMaster('token', data.token); // Set userToken here
            })
            .catch(error => {
                setErrorStatus('No API token for you! ' + error.message);
            });
    }
    
    useEffect(() => {
        // Only enable submit when both userToken and quizMaster are set
        if (quizMaster.token && quizMaster.name) {
            setHandleSubmit(() => onNext);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateQuizMaster = (key, newValue) => {
        setQuizMaster(prevState => ({
            ...prevState,
            [key]: newValue,
        }));
    };

    return (
        <div className="welcomeContainer">
            <h1>Welcome to the quiz creation and play</h1>
            <p>
                This is a simple React application.
                <br/>
                The purpose of this application is to create and play quiz games using the Open Trivia Database API.
            </p>

            <button name="Tutorial" type="submit" onSubmit={ noop }>Wanna see the tutorial?</button>

            <form name="apiKeyForm" onSubmit={ handleUserTokenSubmit }>
                <label for="quizMaster">Please enter your name and press Continue</label>
                <input type="text" id="quizMaster" name="quizMaster" required />
                 {/* nullish coalescing operator like || short-circuit, but more specific */}
                { quizMaster.token ?? <p>Hit the submit button to get an API token</p> }
                { quizMaster.token && <p>Quiz Master, { quizMaster.name }. Your token is: <div className="userTokenContainer">{ quizMaster.token }</div><br/>Press continue button to advance</p> }
                { errorStatus && <p>{ errorStatus }</p> }
            </form>
        </div>
    )
}

export default Welcome;