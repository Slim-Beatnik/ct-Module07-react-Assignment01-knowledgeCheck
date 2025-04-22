import { useState, useEffect } from 'react';

function SelectionInput({ inputIndex, categoryFetchError, setCategoryFetchError, categories, quizInputData, setQuizInputData }){

    const [maxAvailableQuestions, setMaxAvailableQuestions] = useState({});
    const [amountError, setAmountError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuizInputData(name, value);

        // handle max questions
        const maxQuestions = maxAvailableQuestions[quizInputData.difficulty] || maxAvailableQuestions.total || 50;
        if (value < 1 || value > maxQuestions) {
            setAmountError(`Please enter an amount between 1 and ${maxQuestions}`);
        } else {
            setAmountError('');
        }

        setQuizInputData(name, value)
    }
    
    const isInputDataValid = () => {
        const data = { ...quizInputData };
        return Object.values(data).every(value => value.trim() !== '');
    }

    
    const formatQuizInputData = (data) => {
        // handle random - category
        return parseInt(data) == 8 ? 0 : data;
    }

    useEffect(() => {
        const formattedCategory = formatQuizInputData(quizInputData)
        if (formattedCategory) {
            fetch(`https://opentdb.com/api_count.php?category=${ quizInputData.category }`)
                .then(response => response.json())
                .then(data => {
                    const categoryCount = data.category_question_count
                    setMaxAvailableQuestions({
                        easy: categoryCount.total_easy_question_count, 
                        medium: categoryCount.total_medium_question_count,
                        hard: categoryCount.total_hard_question_count,
                        total: categoryCount.total_question_count
                    });
                })
                .catch(error => {
                    setCategoryFetchError(`Error fetching categories: ${ error.message }`);
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizInputData.category]);
    return (
        <div className="selectionInputContainer">
            <div className="priorityInputContainer">
                <input
                    type="radio"
                    id={ `priorityAmount${inputIndex}` }
                    name="queryPriority"
                    value="amount"
                    checked={ quizInputData.queryPriority === 'amount' }
                    defaultChecked={ true }
                    onChange={ handleChange }
                />
                <label htmlFor={ `priority${inputIndex}` }>Prioritize number of questions</label>
                <br />
                <input
                    type="radio"
                    id={ `priorityDifficulty${inputIndex}` }
                    name="queryPriority"
                    value="difficulty"
                    checked={ quizInputData.queryPriority === 'difficulty' }
                    onChange={ handleChange }
                />
                <label htmlFor={ `priorityDifficulty${inputIndex}` }>Prioritize desired difficulty</label>
            </div>
            <div className="categoryInputContainer" id='categoryContainer'>
                <label htmlFor={ `category${inputIndex}` }>Category: </label>
                { categoryFetchError ? (
                    <input
                        type="number"
                        min="8"
                        max="32"
                        id={ `category${inputIndex}` }
                        name="category"
                        value={ quizInputData.category || '' }
                        onChange={ handleChange }
                        title="Your number must within the range"
                        placeholder="Type a category number between 8 - 32"
                    />
                ) : (
                    <select
                        id={ `category${inputIndex}` }
                        name="category"
                        onChange={ handleChange }
                        value={ quizInputData.category || '' }
                        title="You must choose a category or select Random"
                    >
                        <option value="">Select a Category...</option>
                        { Object.keys(categories).map((category, i) => (
                            <option key={ i } value={ categories[category] }>
                                { categories[category].name }
                            </option>
                        ))}
                        <option value="8">Random</option>
                    </select>
                )}
                {categoryFetchError && <p className="errorMessage">{ categoryFetchError }</p>}
            </div>
            <div className="difficultyInputContainer" id='difficultyContainer'>
                <label htmlFor={ `difficulty${inputIndex}` }>Difficulty: </label>
                <select
                    id={ `difficulty${inputIndex}` }
                    name="difficulty"
                    onChange={ handleChange }
                    value={ quizInputData.difficulty }
                >
                    <option value="">Select a Difficulty...</option>
                    <option value="8">Random</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="amountInputContainer" id='amountContainer'>
                <label htmlFor={ `amount${inputIndex}` }>Number of Questions: </label>
                <input
                    type="number"
                    min="1"
                    max={ maxAvailableQuestions[quizInputData.difficulty] || maxAvailableQuestions.total || 50 }
                    id={ `amount${inputIndex}` }
                    name="amount"
                    value={ quizInputData.amount || '' }
                    onChange={ handleChange }
                />
                { amountError && <p className="errorMessage">{ amountError }</p> }
            </div>
            { !isInputDataValid && <p>Be certain to choose your priority and fill out all input fields</p> }
        </div>
    )
}

export default SelectionInput;