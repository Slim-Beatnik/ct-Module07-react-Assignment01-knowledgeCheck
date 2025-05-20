import { useEffect, useState, useCallback } from 'react';
import InputToggleBtn from './buttons/AddSubToggle.jsx';
import QuizSelectionInput from './QuizSelectionInput.jsx';
// import QueryTimer from './QueryTimer.jsx';

function QuizSelectionForm(
    {
        noop,
        setQuiz,
        // requestTimer,
        // setRequestTimer,
        onNext,
        quizMaster,
        setHandleSubmit,
        // errorStatus,
        setErrorStatus
    })
{

    

    const [categories, setCategories] = useState({});
    const [categoryFetchError, setCategoryFetchError] = useState('');
    const [quizFormData, setQuizFormData] = useState([{ queryPriority: 'difficulty', category: '', difficulty: '', amount: '' }]);
    const [isFetching, setIsFetching] = useState(false);

    // fetch or set categories object array
    useEffect(() => {
        fetch(`https://opentdb.com/api_category.php`)
                .then(response => response.json())
                .then(data => {
                    setCategories(data.trivia_categories);
                    setCategoryFetchError('')
                })// reset category error message
                .catch(() => {
                    setCategoryFetchError(`Failed to fetch categories to load dynamically. categories based on data from March '25`);
                    setCategories([
                        {'id': 9, 'name': 'General Knowledge'},
                        {'id': 10, 'name': 'Entertainment: Books'},
                        {'id': 11, 'name': 'Entertainment: Film'},
                        {'id': 12, 'name': 'Entertainment: Music'},
                        {'id': 13, 'name': 'Entertainment: Musicals & Theatres'},
                        {'id': 14, 'name': 'Entertainment: Television'},
                        {'id': 15, 'name': 'Entertainment: Video Games'},
                        {'id': 16, 'name': 'Entertainment: Board Games'},
                        {'id': 17, 'name': 'Science & Nature'},
                        {'id': 18, 'name': 'Science: Computers'},
                        {'id': 19, 'name': 'Science: Mathematics'},
                        {'id': 20, 'name': 'Mythology'},
                        {'id': 21, 'name': 'Sports'},
                        {'id': 22, 'name': 'Geography'},
                        {'id': 23, 'name': 'History'},
                        {'id': 24, 'name': 'Politics'},
                        {'id': 25, 'name': 'Art'},
                        {'id': 26, 'name': 'Celebrities'},
                        {'id': 27, 'name': 'Animals'},
                        {'id': 28, 'name': 'Vehicles'},
                        {'id': 29, 'name': 'Entertainment: Comics'},
                        {'id': 30, 'name': 'Science: Gadgets'},
                        {'id': 31, 'name': 'Entertainment: Japanese Anime & Manga'},
                        {'id': 32, 'name': 'Entertainment: Cartoon & Animations'}
                    ]);
                    alert(`${ categoryFetchError }`);
                });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const formDataIncomplete = () => {
        return quizFormData.some( dataObj => Object.values(dataObj).some( val => val === '' ))
    }

    // hide useEffect by init before handleQuizSelectionFormSubmit -- fetching will appear the first time isFetching changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setHandleSubmit({func: isFetching ? noop : onNext, btnTitle: isFetching ? 'Fetching quiz questions...' : 'Continue', disabled: isFetching }) }, [isFetching]);
    // set button's initial functionality/display state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setHandleSubmit({func: handleQuizSelectionFormSubmit , btnTitle: 'Get Quiz', disabled: formDataIncomplete() }) }, [quizFormData]); 

    const fetchSequentially = (queries) => {
        return new Promise((resolve, reject) => {
            let allQuestions = [];
            let index = 0;

            const fetchNext = () => {
                if (index >= queries.length) {
                    setIsFetching(false);
                    resolve(allQuestions);
                    return;
                }

                setIsFetching(true);
                fetch(`https://opentdb.com/api.php?${queries[index]}`)
                    .then(res => res.json())
                    .then(data => {
                        const multiple = data.results.filter(q => q.type === 'multiple');
                        allQuestions.push(...multiple);
                        index++;
                        setTimeout(fetchNext, 5001); // Wait 5s+1ms before next
                    })
                    .catch(err => {
                        setErrorStatus(`Failed to fetch: ${err.message}`);
                        reject(err);
                    });
            };

            fetchNext();
        });
};

    const handleQuizSelectionFormSubmit = () => {
        

        const formattedQueries = quizFormData.map(formatQuery);

        fetchSequentially(formattedQueries)
            .then(allQuestions => {
                setQuiz(allQuestions);
                setHandleSubmit({func: onNext, btnTitle: 'Take the Quiz', disabled: false });
        })
        .catch(err => {
            console.error('Fetch failed:', err);
            setErrorStatus('Failed to fetch quiz questions. Please try again.');
        });
    }    

    // handle change function -- SelectionInput prop
    const handleInputChange = useCallback((index, name, value) => {
        setQuizFormData(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = { ...newInputs[index], [name]: value};
            return newInputs;
        });
    }, [])

    // ******** HELPER FUNCTIONS *********
    
    // Form buttons
    // add SelectionInput to display array, and new quizInputData
    const addInput = () => {
        setQuizFormData(prev => [
            ...prev,
            { queryPriority: 'difficulty', category: '', difficulty: '', amount: '' }
        ]);
    }

    // remove SelectionInput from display array, and quizInputData at index
    const removeInput = (delIndex) => {
        if (quizFormData.length === 1) {
            clearForm();
            return; // just clear the form if only one input is present
        }
        setQuizFormData(quizFormData.filter((_, index) => index != delIndex));
    }

    // return form data/display back to initial state
    const clearForm = () => {
        setQuizFormData([{ queryPriority: 'difficulty', category: '', difficulty: '', amount: '' }]);
    }
    
    const formatQuery = (dataObj) => {
        //'type=multiple' --- cannot specify type, no api option to check
        // number of questions of specific type, need to filter
        const query=[];

        // handle random category and difficulty
        if (dataObj.category != '8') query.push(`category=${ dataObj.category }`);
        if (dataObj.difficulty != '8') query.push(`difficulty=${ dataObj.difficulty }`);

        query.push(`amount=${ dataObj.amount }`);
        query.push(`token=${ quizMaster.token }`);
        return query.join('&'); // example amount=10&category=9&difficulty=easy&token=YOUR_API_KEY
    }
    // *******VISUAL ELEMENT*******
    // if category fetch fails
    const displayCategoryTable = () => {
        return (
            <div>
                <caption>Open Trivia Categories as of March 2025</caption>
                <table>
                    <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(category => {
                                return (
                                    <tr><td>{ category.id }</td><td>{ category.name }</td></tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    
    return (
        <div className="quizSelectionFormContainer">
            <div className="instructions">
                <h3>{`${ quizMaster.name }`}, below you can choose your quiz questions by category and difficulty: </h3>
                <h4>If you want to add a different category hit the +/- button to add the input fields.</h4>
                <p> Click it again next to the input to remove the input fields in that location.</p>
                <p>
                    For every 50 questions or different categories, based on the api's hardset rules, populating the questions will take an additional 5 seconds.
                    {/* <br/>Fret not, you can set up your teams while you wait. */}
                    <br />
                    The get quiz button will be disabled until you fill out the form, as well as during the fetch process.
                    <br />
                </p>
                <p style={{color: '#f58755'}}>*warning* any more than 3 categories can take over a minute to load.</p>
                
                {/* if category fetch fails category table will be rendered and input will be number based
                    short-curcuit with called function */
                    categoryFetchError && displayCategoryTable()
                }
            </div>
            <div className="formContainer">
                { categories &&
                    <form name="quizSelectionForm" onSubmit={ handleQuizSelectionFormSubmit } className="quizSelectionForm">
                        { quizFormData.map((inputData, index) => (
                            <div key={ index } className="inputs" >
                                <div className="inputBtnContainer">
                                    <InputToggleBtn isSub={ true } bgTopColor="#1C274D" plusColor="#1C274D" bgBottomColor="#de004a" onClick={ () => removeInput(index) } disabled={ quizFormData.length == 1 } />
                                </div>
                                <QuizSelectionInput
                                    inputIndex={ index }
                                    quizInputData={ inputData }
                                    onInputChange={ (name, value) => handleInputChange(index, name, value) }
                                    categories={ categories }
                                    quizFormData={ quizFormData }
                                />
                            </div>
                        )) }
                        <div className="formButton">
                            <InputToggleBtn isSub={ false } bgTopColor="#fff" plusColor="#1C274D" bgBottomColor="#1C274D" onClick={ addInput } />
                            <button type="button" className="clearFormBtn" onClick={ clearForm }>Clear Form</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
    
}

export default QuizSelectionForm;