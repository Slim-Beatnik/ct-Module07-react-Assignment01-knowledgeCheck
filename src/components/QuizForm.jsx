import { useEffect, useState } from "react";

function QuizForm({ quiz, setQuiz, currQuestion, setCurrQuestion, quizResults, setQuizResults, onNext, quizMaster, setHandleSubmit, setErrorStatus }) {

    const [quizNotStarted, setQuizNotStarted] = useState(true);
    const [quizFinished, setQuizFinished] = useState(false);
    const [playerAnswer, setPlayerAnswer] = useState('');
    const [currIndex, setCurrIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    const [questionsPlayerGotWrong, setQuestionsPlayerGotWrong] = useState([]);
    const totalQuestions = quiz.length;


    useEffect(() => {
        setHandleSubmit({
                func: () => {
                    onNext();
                    setErrorStatus('');
                    setQuiz([]);
                },
                btnTitle: 'New Quiz',
                disabled: false
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }) }, [quizFinished])

    useEffect(() => {
        if (!quizNotStarted && !quizFinished) {
            setHandleSubmit({
            func: handleAnswerSubmit,
            btnTitle: 'Submit Answer',
            disabled: playerAnswer === ''
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerAnswer, quizNotStarted, quizFinished]);
;    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setHandleSubmit({ func: startQuiz, btnTitle: 'Start Quiz', disable: false }) }, []);

    useEffect(() => {
        if (!quiz[currIndex]) return;
        const questionWithAnswers = {
            ...quiz[currIndex],
            allAnswers: getShuffledAnswers(quiz[currIndex])
        };
        setCurrQuestion(questionWithAnswers);
    }, [currIndex, quiz, setCurrQuestion]);

    const decodeHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const quizBreakdown = () => {
        const categoryMap = {};
        for (const question of quiz) {
            categoryMap[question.category] = (categoryMap[question.category] || 0) + 1;
        }
        return Object.entries(categoryMap);
    };

    const startQuiz = () => {
        setQuizNotStarted(false);
        setErrorStatus('');
        setHandleSubmit({ func: handleAnswerSubmit, btnTitle: 'Submit Answer', disabled: false });
    };

    const getShuffledAnswers = (question) => {
        const all = [...question.incorrect_answers, question.correct_answer];
        return all.sort(() => Math.random() - 0.5);
    };

    const handleAnswerSubmit = () => {
        if (!playerAnswer) {
            setErrorStatus('You must select an answer before continuing.');
            return;
        }

        setAnswerSubmitted(true);

        const answeredCorrectly = playerAnswer === quiz[currIndex].correct_answer;

        if (answeredCorrectly) {
            setCorrectAnswers(prev => prev + 1);
        } else {
            setQuestionsPlayerGotWrong(prev => [...prev, {
                q: currQuestion.question,
                a: currQuestion.correct_answer
            }]);
        }

        const isLastQuestion = currIndex + 1 === totalQuestions;

        if (isLastQuestion) {
            const finalCorrectCount = answeredCorrectly ? correctAnswers + 1 : correctAnswers;
            setQuizResults({ correct: finalCorrectCount, total: totalQuestions });
            setQuizFinished(true);
            
        } else {
            setHandleSubmit({
                func: handleNextQuestion,
                btnTitle: 'Next Question',
                disabled: false
            });
        }
    };

    const handleNextQuestion = () => {
        setAnswerSubmitted(false);
        setPlayerAnswer('');
        setCurrIndex(prev => prev + 1);
        setHandleSubmit({ func: handleAnswerSubmit, btnTitle: 'Submit Answer', disabled: false });
    };

    return (
        <div className="quizContainer">
            {quizNotStarted ? (
                <div id="quizIntro">
                    <h1>{ quizMaster.name }, your quiz is ready.</h1>
                    <h3>There are { totalQuestions } total questions.</h3>
                    <p>We've filtered out the non-multiple choice questions so your quiz numbers are a bit different.</p>
                    <p>Here's the breakdown:</p>
                    {quizBreakdown().map(([category, count]) => (
                        <p key={category}>{count} questions about { decodeHtml(category) }</p>
                    ))}
                    <p>Click the button below to start the quiz.</p>
                </div>
            ) : ( !quizNotStarted && !quizFinished && (
                <div className="quizContent">
                    <form className="quizMultipleChoiceForm" onSubmit={(e) => e.preventDefault()}>
                        <div className="quizQuestionContainer">
                            <h3 className="quizQuestion">{ decodeHtml(currQuestion.question) }</h3>
                            <div className="quizAnswerContainer">
                                { currQuestion.allAnswers.map((answer, i) => {
                                    const isSelected = playerAnswer === answer;
                                    const isCorrect = answer === currQuestion.correct_answer;

                                    let showCorrectClassName = 'quizAnswerOption ';
                                    if (answerSubmitted) {
                                        showCorrectClassName += isCorrect ? 'correct' : isSelected ? 'incorrect' : '';
                                    }
                                    return (
                                        <div key={i} className={ showCorrectClassName }>
                                            <input
                                                type="radio"
                                                id={`q${ currIndex }a${ i }`} 
                                                className={`answer${ i }`}
                                                name={`question${ currIndex }`}
                                                value={answer}
                                                checked={playerAnswer === answer}
                                                onChange={() => setPlayerAnswer(answer)}
                                            />
                                            <label htmlFor={`q${ currIndex }a${ i }`}>{ decodeHtml(answer) }</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </form>
                </div>
            ))}
            <div id="resultsContainer">
                { quizFinished && (
                    <div id="quizResults">
                        <h1>{ quizMaster.name }'s Quiz Results</h1>
                        <h3>You got { quizResults.correct } out of { quizResults.total } questions correct.</h3>
                        <p>Here are the questions you got wrong:</p>
                        <ul>
                            {questionsPlayerGotWrong.map((question, i) => (
                                <li key={i}>
                                    <strong>{decodeHtml(question.q)}</strong>: {decodeHtml(question.a)}
                                </li>
                            ))}
                        </ul>
                    </div>
    )}
            </div>
        </div>
    );
}

export default QuizForm;
