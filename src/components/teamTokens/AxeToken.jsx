function AxeToken( { color, teamName, displayName }) {
    return (
        <div className={ `${ teamName }` }>
            <svg class="color" fill={ color } width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>axe</title>
                <path d="M13.742 21.83l8.272-8.272-0.441-0.441 1.875-1.875-2.726-2.726-1.875 1.875-0.441-0.441-0.341 0.341c-1.184-2.35-0.963-5.218 1.157-8.84l-0-0c-10.302-4.136-21.415 8.411-17.85 18.249 3.339-1.941 6.782-2.769 9.352-2.067l-0.589 0.589 0.441 0.441-9.905 9.905v2.838h2.614l10.017-10.017 0.441 0.441zM30.578 12.807c-3.673 2.149-6.565 2.354-8.93 1.117l-7.278 7.278c0.755 2.58-0.072 6.068-2.041 9.455 9.838 3.564 22.385-7.548 18.249-17.85z"></path>
            </svg>
            { displayName && <h1>{ teamName }</h1> }
		</div>
    )
}

export default AxeToken;