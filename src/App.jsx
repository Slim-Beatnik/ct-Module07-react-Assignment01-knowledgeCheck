import { useCallback, useState } from 'react';
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
    maps
    useEffects
    return
*/

function App() {

    // inactive function placeholder
    const noop = () => {};

    // all pages
    const [errorStatus, setErrorStatus] = useState('');
    const [handleSubmit, setHandleSubmit] = useState({func: noop, btnTitle: ''});

    // footerNav
    const [currentPage, setCurrentPage] = useState('welcome');
    const [requestTimer, setRequestTimer] = useState(noop);
    
    // forms - quizSelectionForm and teamSelectionForm
    const [currentFormId, setCurrentFormId] = useState('quizSelectionForm');

    // welcome page
    const [quizMaster, setQuizMaster] = useState([{name: '', token: ''}])
    
    //quiz selection page - fetch categories
    const [quizRequest, setQuizRequest] = useState([]);
    
    // team creation page
    const [teamInfo, setTeamInfo] = useState(
        {
            teamName: 'Team 1',
            teamColor: '#000',
            teamToken: '',
            teamQuizDisplay: '',
            teamQuizResultsDisplay: ''
        }
    );
    const [teams, setTeams] = useState([]); // store teams for full iteration per quiz question

    // quiz page
    const [questions, setQuestions] = useState([]); // store quizRequests for full iteration per quiz
    const [currQuestion, setCurrQuestion] = useState(0);

    // results page
    const [quizResults, setQuizResults] = useState([]);

    useCallback(() => {
        if (currentPage === 'welcome') { setCurrentFormId('quizMasterForm') }
        if (currentPage === 'selection') { setCurrentFormId('quizSelectionForm') }
        if (currentPage === 'team') { setCurrentFormId('teamCreationForm') }
    }
    , [currentPage]);
    
    const onPrev = useCallback(() => {
        if (navMap[currentPage]?.prev) setCurrentPage(navMap[currentPage].prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    const onNext = useCallback(() => {
        if (navMap[currentPage]?.next) setCurrentPage(navMap[currentPage].next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    // Shared props for *almost* all pages
    const sharedProps = { onNext, quizMaster, setHandleSubmit, errorStatus, setErrorStatus };

    // prev and next mapped by currentPage
    const navMap = {
        welcome: { prev: null, next: 'selection' },
        selection: { prev: 'welcome', next: 'team' },
        team: { prev: 'selection', next: 'quiz' },
        quiz: { prev: 'team', next: 'results' },
        results: { prev: 'quiz', next: 'selection' }
    }

    // Easy to track props
    const propMap = {
        welcome: { setQuizMaster, ...sharedProps },
        selection: { requestTimer, setRequestTimer, quizRequest, setQuizRequest, ...sharedProps },
        team: { teamInfo, setTeamInfo, teams, setTeams, ...sharedProps },
        quiz: { teamInfo, setQuizResults, questions, currQuestion, ...sharedProps },
        results: { quizResults, ...sharedProps },
        controls: { noop, currentFormId, onPrev, currentPage, setCurrentPage, setQuizMaster, requestTimer, setQuestions, setCurrQuestion, handleSubmit, ...sharedProps }
    };
    
    // Define page components dynamically
    const pages = {
        welcome: (props) => <Welcome {...props } />,
        selection: (props) => <QuizSelectionForm  {...props} />,
        team: (props) => <TeamCreationForm {...props} />,
        quiz: (props) => <Quiz {...props} />,
        results: (props) => <QuizResults {...props} />
    };
    console.log(pages)
    return (
        <div id="superContainer">
            <div id="topContainer">
            { pages[currentPage] ? 
                pages[currentPage]({ ...propMap[currentPage] })
                : <Welcome onNext={() => setCurrentPage("selection")} />
            }
            {/* <QuizSelectionForm { ...propMap['selection'] } /> */}
            </div>
            <div id="controlsContainer">
                <FooterControls { ...propMap['controls'] } />
            </div>
        </div>
    )
}

export default App;