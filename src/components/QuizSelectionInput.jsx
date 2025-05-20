import { useState, useEffect } from 'react';

function QuizSelectionInput({ inputIndex, categoryFetchError, setCategoryFetchError, categories, quizInputData, onInputChange }) {

    const [maxAvailableQuestions, setMaxAvailableQuestions] = useState({});
    const [amountError, setAmountError] = useState('');
    
    const handleChange = (event) => {
        let { name, value } = event.target;
        if (name.includes('queryPriority')) {
            name = 'queryPriority';
        }
        if (name === 'amount') {
            // if quizPriority is amount, and request amount is greater than available amount, switch to random difficulty, guaranteeing 50 max questions
            
            if (value > 50) {
                value = 50;
                setAmountError(`The amount has been changed to ${ value }. There is a maximum cap of 50 questions for each API query.`);
            }
            if (quizInputData.queryPriority === 'amount' && value > maxAvailableQuestions[quizInputData.difficulty]) {
                onInputChange('difficulty', '8');
                value = Math.min(value, maxAvailableQuestions[quizInputData.total])
                setAmountError(`The amount has been changed to ${ value }. There are ${ maxAvailableQuestions[quizInputData.total] } questions available for this category, but the difficulty will vary.`);
            }
            // quizPriority: when difficulty, set questions to max available questions for the difficulty to keep request from failing
            if (quizInputData.queryPriority === 'difficulty' && value > maxAvailableQuestions[quizInputData.difficulty]) {
                value = Math.min(value, maxAvailableQuestions.total, maxAvailableQuestions[quizInputData.difficulty]);
                setAmountError(`The amount has been changed to ${ value }. There are only ${ maxAvailableQuestions[quizInputData.difficulty] } questions available for this difficulty.`);
            }
            if (quizInputData.queryPriority === 'difficulty' && quizInputData.difficulty == '8' && value > maxAvailableQuestions.total) {
                value = Math.min(value, maxAvailableQuestions.total);
                setAmountError(`The amount has been changed to ${ value }. There are only ${ maxAvailableQuestions.total } questions available for this category.`);
            }
            
            if (value <= 0) {
                value = 1;
            }
            value = value.toString();
        }

        onInputChange(name, value); // let parent handle actual state update based on index
    }
    
    const isInputDataValid = () => {
        return Object.values(quizInputData).every(value => value.toString().trim() !== '');
    }

    useEffect(() => {
        if (quizInputData.category && quizInputData.category !== '8') {
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

    const displayMaxAvailableQuestions = () => {
        if (quizInputData.queryPriority === 'amount' || quizInputData.difficulty === '8') {
            return Math.min(maxAvailableQuestions.total, 50);
        } else {
            return Math.min(maxAvailableQuestions[quizInputData.difficulty], 50);
        }
    }

    return (
        <div className="selectionInputContainer">
            {/* PRIORITY */}
            <div className="priorityInputContainer">
                <input
                    type="radio"
                    id={ `priorityAmount${inputIndex}` }
                    name={ `queryPriority${inputIndex}` }
                    value="amount"
                    checked={ quizInputData.queryPriority === 'amount' }
                    onChange={ handleChange }
                />
                <label htmlFor={ `priorityAmount${inputIndex}` }>Prioritize number of questions</label>
                <br />
                <input
                    type="radio"
                    id={ `priorityDifficulty${inputIndex}` }
                    name={ `queryPriority${inputIndex}` }
                    value="difficulty"
                    checked={ quizInputData.queryPriority === 'difficulty' }
                    onChange={ handleChange }
                />
                <label htmlFor={ `priorityDifficulty${inputIndex}` }>Prioritize desired difficulty</label>
            </div>
            {/* CATEGORY */}
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
                        { Object.values(categories).map((category, i) => (
                            <option key={ i } value={ category.id }>
                                { category.name }
                            </option>
                        ))}
                        <option value="8">Random</option>
                    </select>
                )}
                {categoryFetchError && <p className="errorMessage">{ categoryFetchError }</p>}
            </div>
            {/* DIFFICULTY */}
            <div className="difficultyInputContainer" id='difficultyContainer'>
                <label htmlFor={ `difficulty${inputIndex}`}>Difficulty: </label>
                <select
                    id={ `difficulty${inputIndex}` }
                    name="difficulty"
                    onChange={ handleChange }
                    value={ quizInputData.difficulty }
                    disabled={ !quizInputData.category }
                >
                    <option value="">Select a Difficulty...</option>
                    <option value="8">Random</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            {/* AMOUNT */}
            <div className="amountInputContainer" id='amountContainer'>
                <label htmlFor={ `amount${inputIndex}` }>Number of Questions: </label>
                <input
                    type="number"
                    min="1"
                    max={ displayMaxAvailableQuestions() || 1 }
                    id={ `amount${inputIndex}` }
                    name="amount"
                    value={ quizInputData.amount || '' }
                    onChange={ handleChange }
                    disabled={ !quizInputData.difficulty && !maxAvailableQuestions }
                />
                { amountError && <p className="errorMessage">{ amountError }</p> }
            </div>
            { !isInputDataValid() && <p>Be certain to choose your priority and fill out all input fields</p> }
        </div>
    )
}

export default QuizSelectionInput;