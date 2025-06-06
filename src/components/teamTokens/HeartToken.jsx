function HeartToken({ color, teamName, displayName }) {
    return (
		<div className={ `${ teamName }` }>
			<svg class="color" fill={ color } height="100%" width="100%" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 296.472 296.472" xml:space="preserve">
				<g>
					<path d="M148.237,0C66.368,0,0,66.367,0,148.235c0,81.869,66.367,148.236,148.236,148.236c81.867,0,148.234-66.367,148.234-148.236
						C296.471,66.367,230.104,0,148.237,0z M148.236,239.217c-127-81.04-91.78-153.231-58.15-163.982
						c28.343-9.059,52.715,8.4,58.15,31.099c5.436-22.698,29.808-40.157,58.15-31.099C240.016,85.985,275.236,158.177,148.236,239.217z"
						/>
				</g>
			</svg>
			{ displayName && <h1>{ teamName }</h1> }
		</div>
    )
}

export default HeartToken;