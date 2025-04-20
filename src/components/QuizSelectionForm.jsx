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

    console.log(requestTimer, setRequestTimer, quizRequest, onPrev, onNext, setHandleSubmit, errorStatus)

    const [categories, setCategories] = useState([{}]);
    const [categoryFetchError, setCategoryFetchError] = useState('');
    const [quizFormData, setQuizFormData] = useState([{index: 0, inputs:{ queryPriority: '', category: '', difficulty: '', amount: '' }}]);

    
    
    
    useEffect(() => {
        fetch(`https://opentdb.com/api_category.php`)
                .then(response => response.json())
                .then(data => {
                    setCategories([data.trivia_categories]);
                    console.log([data.trivia_categories])
                    setCategoryFetchError('')
                })// reset category error message
                .catch(() => {
                    setCategoryFetchError(`Failed to fetch categories to load dynamically.`);
                    setCategories({
                            'Random': 8,
                            'General Knowledge': 9,
                            'Entertainment: Books': 10,
                            'Entertainment: Film': 11,
                            'Entertainment: Music': 12,
                            'Entertainment: Musicals &amp; Theatres': 13,
                            'Entertainment: Television': 14,
                            'Entertainment: Video Games': 15,
                            'Entertainment: Board Games': 16,
                            'Science &amp; Nature': 17,
                            'Science: Computers': 18,
                            'Science: Mathematics': 19,
                            'Mythology': 20,
                            'Sports': 21,
                            'Geography': 22,
                            'History': 23,
                            'Politics': 24,
                            'Art': 25,
                            'Celebrities': 26,
                            'Animals': 27,
                            'Vehicles': 28,
                            'Entertainment: Comics': 29,
                            'Science: Gadgets': 30,
                            'Entertainment: Japanese Anime &amp; Manga': 31,
                            'Entertainment: Cartoon &amp; Animations': 32
                });
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
                            categories[0].map((categoryName, categoryNum) => {
                                return (
                                    <tr><td>{ categoryNum }</td><td>{ categoryName }</td></tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    const handleInputChange = (index, name, value) => {
        const updatedFormData = [...quizFormData];
        updatedFormData[index][name] = value;
        setQuizFormData(updatedFormData);
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
        setQuizFormData(quizFormData.filter((_, index) => index!= delIndex));
    }

    // clear data from display and data arrays by reinitializing them to defaults
    const clearForm = () => {
        setQuizFormData([ { queryPriority: '', category: '', difficulty: '', amount: '' }]);
    }

    const isFormDataValid = (data) => {
        return data.queryPriority && data.category && data.difficulty && data.amount;
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
    console.log('quizRequest:', quizRequest);
    console.log('quizRequest is array:', Array.isArray(quizRequest));
    quizRequest.forEach((item, i) => {
        console.log(`item ${i}:`, item);
    });
        console.log(handleInputChange, removeInput, addInput, clearForm)
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
                <form name="quizSelectionForm" onSubmit={ handleQuizSelectionFormSubmit } className="quizSelectionForm">
                    { quizFormData.map((inputData, index) => (
                        <div key={ index } className={ `input${ index }` }>
                            <SelectionInput
                                quizInputData={ inputData }
                                setQuizInputData={ (name, value) => handleInputChange(index, name, value) }
                                categories={ categories }
                            />
                            <input type="image" src="InputToggleBtn" onClick={ () => removeInput(index) } />
                        </div>
                    )) }
                    <input type="image" src={ InputToggleBtn } onClick={ addInput } />
                    <button className="clearFormBtn" onClick={ clearForm }>Clear Form</button>
                    <button type="submit">Submit Quiz Request</button>
                </form>
            </div>
        </div>
    )
}

export default QuizSelectionForm;