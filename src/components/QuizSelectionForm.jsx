import { useEffect, useState } from 'react';

function QuizSelectionForm( userAPI, quizRequest, setQuizRequest, errorStatus, setErrorStatus ) {

    const [categories, setCategories] = useState({});
    const [quizFormData, setQuizFormData] = useState({ category: '', difficulty: '', amount: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuizFormData(prevState => ({
            ...prevState,
            // set key called name to point to value
            [name]: value,
        }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormDataValid(quizFormData)) {
            alert(errorStatus);
            return;
        }
        setQuizRequest = formattedQuery(quizFormData);
    }
    
    const formattedQuery = () => {
        let query=['type=multiple']
        if (quizFormData.category != 0) { query.push(`category=${quizFormData.category}`) }
        if (quizFormData.difficulty != 0) {query.push(`difficulty=${quizFormData.difficulty}`) }
        query.push(`amount=${quizFormData.amount}`, `token=${userAPI}`)
        return query.join('&')
    }

    useEffect(() => {
        fetch(`https://opentdb.com/api_category.php`)
                .then(response => response.json())
                .then(data => {
                    setCategories(data.trivia_categories);
                    setErrorStatus('')
                })// reset category error message
                .catch(() => {
                    setErrorStatus(`Failed to load categories.`);
                    setCategories(
                        {
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
                        }
                    )
                    console.alert({ errorStatus });
                });
    },[errorStatus, setErrorStatus]);

    const isFormDataValid = (data) => {
        if ( Object.values(data).every(value => value.trim() !== '') ) {
            return true;
        } else {
            window.alert('All fields are required');
            return false;
        }
    }

   /*  const formatQuizFormData = (data) => {
        // handle random - categoy
        if (parseInt(data.category) === 8) {
            data.category = 0;
        }

    }

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
      }, []) */

    const categoryTable = () => {
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
                            categories.map((categoryName, categoryNum) => {
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

        // if errorStatus display category table to show which id nums associate with the desired category
    // And input type=text for 
    return (
        <div className="formContainer">
            { errorStatus && categoryTable() /* short-curcuit with called function */}
            <form name="QuizSelectionForm" onSubmit={ handleSubmit }>
                    {/* if category fetch fails category table will be rendered and input will be number based */}
                <div className="categoryInputContainer" id='categoryContainer'>
                    <label htmlFor="category">Category: </label>
                    {errorStatus ? (
                        <input
                            type="number"
                            min="8"
                            max="32"
                            name="category"
                            value={ quizFormData.category }
                            onChange={ handleChange }
                            title="Your number must within the range"
                            placeholder="Type a category number between 8 - 32"
                        />
                    ) : (
                        <select
                            name="category"
                            onChange={ handleChange }
                            value={ quizFormData.category }
                            title="You must choose a category, to randomize, select Random"
                        >
                            <option value="">Select a Category...</option>
                            {categories.map((category) => (
                                <option key={ category.id } value={ category.id }>
                                    { category.name }
                                </option>
                            ))}
                            <option value="8">Random</option>
                        </select>
                    )}
                    {errorStatus && <p>{ errorStatus }</p>}
                </div>
                <div className="difficultyInputContainer" id='difficultyContainer'>
                    <label htmlFor="difficulty">Difficulty: </label>
                    <select name="difficulty" onChange={ handleChange } value={ quizFormData.difficulty }>
                        <option value="">Select a Difficulty...</option>
                        <option value="8">Random</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="amountInputContainer" id='amountContainer'>
                    <label htmlFor="amount">Number of Questions: </label>
                    <input
                        type="number"
                        min="1"
                        max={ maxAvailableQuestions }
                        name="amount"
                        value={ quizFormData.amount }
                        onChange={ handleChange }
                    />
                </div>
            </form>
        </div>
    )
}