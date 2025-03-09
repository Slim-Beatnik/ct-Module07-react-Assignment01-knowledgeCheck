import { useState, useEffect } from 'react';

function QuizSelectionForm() {
    const [formData, setFormData] = useState({
        category: '',
        difficulty: '',
        amount: ''
    });

    const [categories, setCategories] = useState([]);
    const [inputValue] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [errorStatus, setErrorStatus] = useState('');

    useEffect(() => {
        fetch(`https://opentdb.com/api_category.php`)
                .then(response => response.json())
                .then(data => {
                    setCategories(data.trivia_categories);
                    setCategoryError('')
                })// reset category error message
                .catch(() => {
                    setCategoryError(`Failed to load categories`);
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
                    handleError();
                });
    },[]);

    const handleError = () => {
        setErrorStatus('Error loading categories');
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormDataValid(formData)) {
            alert({ errorStatus });
            return;
        }
        
        return formatFormData(formData);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const isFormDataValid = (data) => {
        if ( Object.values(data).every(value => !value.trim.isEmpty()) ) {
            setErrorStatus('');
            return true;
        } else {
            setErrorStatus('All fields are required');
            return false;
        }
    }

    const formatFormData = (data) => {
        // handle random - formData
        if (data.category == 8) {
            data.category = 0;
        } else {
            // if not random, was category made due to fetch error
            if (categories.Random) {
                data.category = categories[data.category];
            } else {
                // if no fetch error categories data format will be [{id: number, name: category}, { etc... }]
                categories.forEach(category => {
                    if (data.category == category.name) {
                        data.category = category.id;
                    }
                });
            }
        }
        if (data.difficulty.toLowerCase() == 'random') {
            data.difficulty = 0;
        }
    }

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
            { errorStatus && categoryTable() }
            <form>
                 {/* if category fetch fails category table will be rendered and input will be number based */}
                <div className="categoryInputContainer">
                    <label htmlFor="category">Category: </label>
                    {categoryError ? (
                        <input
                            type="number"
                            min="8"
                            max="32"
                            name="category"
                            value={ inputValue }
                            onChange={ handleChange }
                            title="Your number must within the range"
                            placeholder="Type a category number between 8 - 32"
                        />
                    ) : (
                        <select
                            onChange={ handleChange }
                            value={ inputValue }
                            title="You must choose a category, to randomize, select Random"
                        >
                            <option value="">Select a Category...</option>
                            {categories.map((category) => (
                                <option key={ category.id } value={ category.id }>{ category.name }</option>
                            )
                        )}
                        <option value="0">Random</option>
                        </select>
                    )}
                    {categoryError && <p>{ categoryError }</p>}
                </div>
                <div className="difficultyInputContainer">
                    <label htmlFor="difficulty">Difficulty: </label>
                    <select name="difficulty">
                        <option value="">Select a Difficulty...</option>
                        <option value="0">Random</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="amountInputContainer">
                    <label htmlFor="amount">Number of Questions: </label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        name="amount"
                        value={ formData.amount }
                        onChange={ handleChange }
                    />
                </div>
                <div className="buttonContainer">
                    <button type="button" onClick={ handleSubmit }>Get my trivia questions</button> 
                </div>
            </form>
        </div>
    )
    
}

export default QuizSelectionForm