import { useState } from 'react';
import './App.css';
import FooterControls from './components/FooterControls.jsx';
import Welcome from './components/Welcome.jsx';
import TeamCreationForm from './components/TeamCreationForm.jsx';
import QuizSelectionForm from './components/QuizSelectionForm.jsx';
import Quiz from './components/Quiz.jsx';
import QuizResults from './components/QuizResults.jsx';
// import Tutorial from './components/Tutorial.jsx';

/* document organization:
    imports - obviously 
    useStates, in order of (on every page, default appearance order, optional appearance
    Handlers  
*/

function App() {

    const noop = () => {}
    const onNext = noop;

    // all pages
    const [errorStatus, setErrorStatus] = useState('');
    const [handleSubmit, setHandleSubmit] = useState(noop);

    // footerNav
    const [currentPage, setCurrentPage] = useState('welcome');

    // welcome page
    const [quizMaster, setQuizMaster] = useState({name: '', token: null})
    
    //quiz selection page - fetch categories
    const [quizRequest, setQuizRequest] = useState('');
    const [requestTimer, setRequestTimer] = useState(null);
    
    // team creation page
    const [teamInfo, setTeamInfo] = useState({ teamName: "Team 1", color: '#000', teamToken: '/teamTokens/teamMeepleKing.svg' });
    const [teams, setTeams] = useState([]); // store teams for full iteration per quiz question

    // quiz page
    const [questions, setQuestions] = useState([]); // store quizRequests for full iteration per quiz
    const [currQuestion, setCurrQuestion] = useState(0);

    // results page
    const [quizResults, setQuizResults] = useState(null);

    // Shared props for *almost* all pages
    const sharedProps = { quizMaster, setHandleSubmit, errorStatus, setErrorStatus }

    // Easy to track props
    const propMap = {
        welcome: { onNext, noop, setQuizMaster, ...sharedProps },
        selection: { onNext, quizRequest, setQuizRequest, setRequestTimer, ...sharedProps },
        team: { onNext, teamInfo, setTeamInfo, teams, setTeams, ...sharedProps },
        quiz: { onNext, teamInfo, setQuizResults, questions, currQuestion, ...sharedProps },
        results: { onNext, quizResults, ...sharedProps },
        controls: { currentPage, setCurrentPage, setQuizMaster, requestTimer, setRequestTimer, setQuestions, setCurrQuestion, handleSubmit, ...sharedProps }
    };
    
    // Define page components dynamically
    const pages = {
        welcome: (props) => <Welcome onNext={() => setCurrentPage('selection')} {...props} />,
        selection: (props) => <QuizSelectionForm onNext={() => setCurrentPage('team')} {...props} />,
        team: (props) => <TeamCreationForm onNext={() => setCurrentPage('start')} {...props} />,
        quiz: (props) => <Quiz  onNext={() => setCurrentPage('results')} {...props} />,
        results: (props) => <QuizResults onNext={() => setCurrentPage('selection')} {...props} />
    };
    

    return (
        <div>
            {(pages[currentPage] ?
                (pages[currentPage]({ ...propMap[currentPage] }) )
                : (<Welcome onNext={() => setCurrentPage("selection")} />)
            )}
            <FooterControls { ...propMap['controls'] } />
        </div>
    )
}

export default App;