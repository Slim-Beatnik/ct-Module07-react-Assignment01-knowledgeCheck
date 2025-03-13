import { useState, useEffect } from "react";
import "./App.css";
import Welcome from "./Welcome.jsx";
import FooterControls from "./components/FooterControls.jsx";
import TeamCreationForm from "./components/TeamCreationForm.jsx";
import QuizSelectionForm from "./components/QuizSelectionForm.jsx";

/* document organization:
  imports - obviously 
  pageOrder table 
  useStates, in order of (on every page, default appearance order, optional appearance, multiple
  Handlers  
*/

function App() {

// const pageOrder= { }

  // FOOTER - button states
  const [buttonState, setButtonState] = useState({
    restartBtn: {display: '', disabled: 'disabled'},
    tutorialBtn: {display: '', disabled: 'disabled'},
    prevPageBtn: {display: '', disabled: 'disabled'},
    playBtn: {display: '', disabled: 'disabled'},
    submitFormBtn: {display: '', disabled: ''}, // submitButton enabled to show error message if submit w/o all quizFormData fields filled
    submitAnswerBtn: {display: false, disabled: 'disabled'},
    nextQuestionBtn: {display: false, disabled: 'disabled'}
  });

  // WELCOME - userFormData:{username:, apiKey: }
  const [userFormData, setUserFormData] = useState({
    username: '',
    apiKey: '',
  });

  // TUTORIAL - tutorialData, pageIndex

  // QUIZ SELECTION FORM - quizFormData, categories, category Error
  const [quizFormData, setQuizFormData] = useState({
    category: '',
    difficulty: '',
    amount: '',
  });

  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState('');

  // TEAM - team states
  const teamData = useState([
    { name: '',
      color: 'black',
      correctAnswers: 0 }
  ]);
  
  // MULTIPLE
  const [errorStatus, setErrorStatus] = useState(''); // ALL
  const [currPage, setCurrPage] = useState('Welcome') // APP | FOOTER

  // FETCHES


  const formattedQuery = () => {
    query=['type=multiple']
    if (quizFormData.category != 0) { query.push(`category=${quizFormData.category}`) }
    if (quizFormData.difficulty != 0) {query.push(`difficulty=${quizFormData.difficulty}`) }
    query.push(`amount=${quizFormData.amount}`)
    return query.join('&')
}

  useEffect((formattedQuery) => {
    
    fetch(`https://opentdb.com/api.php?${ formattedQuery }`)
    .then(response => response.json())
    .then(data => {
      setCategories(data);
      setCategoryError('');
    })
    .catch(() => {
      setCategoryError(`Failed to load categories`);
  }, [])

  return (
    <div className="appContainer">
      
      <FooterControls
        buttonState={ buttonState }
        setButtonState={ setButtonState }
        currPage={ currPage }
        setCurrPage={ setCurrPage }
        setErrorStatus={ setErrorStatus }
      />
    </div>
  )
}

export default App;