import { useEffect, useState } from 'react';
// import { useTimer } from 'react-timer-hook';
import InputToggleBtn from '/buttons/addSubToggle.svg';
import SelectionInput from './SelectionInput.jsx';
// import QueryTimer from './QueryTimer.jsx';

function QuizSelectionForm(
    {
        requestTimer,
        setRequestTimer,
        quizRequest,
        setQuizRequest,
        onPrev,
        onNext,
        quizMaster,
        setHandleSubmit,
        errorStatus,
        setErrorStatus
    })
{

    console.log('bypass: ',requestTimer, setRequestTimer, quizRequest, onPrev, onNext, setHandleSubmit, errorStatus)

    const [categories, setCategories] = useState({});
    const [categoryFetchError, setCategoryFetchError] = useState('');
    const [quizFormData, setQuizFormData] = useState([{inputs:{ queryPriority: '', category: '', difficulty: '', amount: '' }}]);

    

    
    
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

    const handleInputChange = (index, name, value) => {
        setQuizFormData(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = { ...newInputs[index], [name]: value};
            return newInputs;
        });
    }

    // add SelectionInput to display array, and new quizInputData
    const addInput = () => {
        setQuizFormData(prev => [
            ...prev,
            { queryPriority: '', category: '', difficulty: '', amount: '' }
        ]);
    }

    // remove SelectionInput from display array, and quizInputData at index
    const removeInput = (delIndex) => {
        if (quizFormData.length === 1) {
            clearForm
        }
        setQuizFormData(quizFormData.filter((_, index) => index != delIndex));
    }

    // clear data from display and data arrays by reinitializing them to defaults
    const clearForm = () => {
        setQuizFormData([ { queryPriority: '', category: '', difficulty: '', amount: '' }]);
    }

    const isFormDataValid = (data) => {
        return [
            data.queryPriority.trim() !== ''
            && data.category.trim() !== ''
            && data.difficulty.trim() !== ''
            && data.amount.trim() !== ''
        ].every(b => b == true)
    }
    
    const formatQuery = (data) => {
        return data.map(input => {
            const query=['type=multiple']
            if (input.category) query.push(`category=${ input.category }`);
            if (input.difficulty) query.push(`difficulty=${ input.difficulty }`);
            query.push(`amount=${ input.amount }`);
            return query.join('&');
        });
    }

    const handleQuizSelectionFormSubmit = (event) => {     
        event.preventDefault();
        if (quizFormData.some((data) => !isFormDataValid(data))) {
            setErrorStatus('All fields must be filled.');
            return;
        }

        const formattedQueries = []
        quizFormData.map(data => { formattedQueries.push(formatQuery(data)) });
        setQuizRequest(formattedQueries);

        
    }
    

    return (
        <div className="quizSelectionFormContainer">
            <div className="instructions">
                <h3>{`${ quizMaster.name }`}, below you can choose your quiz questions by category and difficulty: </h3>
                <h4>If you want to add a different category hit the +/- button to add the input fields.</h4>
                <p> Click it again next to the input to remove the input fields in that location.</p>
                <p>
                    For every 50 questions or different categories, based on the api's hardset rules, populating the questions will take an additional 5 seconds.
                    <br/>Fret not, you can set up your teams while you wait.
                </p>
                {/* if category fetch fails category table will be rendered and input will be number based
                    short-curcuit with called function */
                    categoryFetchError && displayCategoryTable()
                }
            </div>
            <div className="formContainer">
                { categories &&
                    <form name="quizSelectionForm" onSubmit={ handleQuizSelectionFormSubmit } className="quizSelectionForm">
                        { quizFormData.map((inputData, index) => (
                            <div key={ index } className={ `input${ index }` }>
                                <SelectionInput
                                    inputIndex={ index }
                                    quizInputData={ inputData }
                                    setQuizInputData={ (name, value) => handleInputChange(index, name, value) }
                                    categories={ categories }
                                />
                                <div className="svgButton">
                                    <input className="remove" type="image" src={ InputToggleBtn } onClick={ () => removeInput(index) } />
                                </div>
                            </div>
                        )) }
                        <div className="svgButton">
                            <input className="add" type="image" src={ InputToggleBtn } onClick={ addInput } />
                            <button type="button" className="clearFormBtn" onClick={ clearForm }>Clear Form</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}

export default QuizSelectionForm;