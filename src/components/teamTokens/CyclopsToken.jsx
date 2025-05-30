function CyclopsToken({ color, teamName, displayName }) {
    return (
		<div className={ `${ teamName }` }>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 32 32" xml:space="preserve">
				<style type="text/css">
					{`.st0{fill:none;stroke:${ color };stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} `}
				</style>
				<path class="st0 color" d="M9,12v3c0,1.1,0.9,2,2,2h0c1.4,0,2.9-0.2,4.2-0.8c0.2-0.1,0.5-0.2,0.8-0.2c0.3,0,0.6,0.1,0.8,0.2
					c1.3,0.6,2.7,0.8,4.2,0.8h0c1.1,0,2-0.9,2-2v-3c0-1.1-0.9-2-2-2H11C9.9,10,9,10.9,9,12z"/>
				<line class="st0 color" x1="13" y1="13" x2="19" y2="13"/>
				<path class="st0 color" d="M10.4,16.9c0.5,1.4,1.4,2.5,2.6,3.3v0c0,2.3-1.6,4.2-3.8,4.8c-2.6,0.7-4.5,2.8-5.1,5.4C4.1,30.7,4.3,31,4.7,31
					l22.7,0c0.4,0,0.6-0.3,0.5-0.7c-0.5-2.6-2.5-4.7-5.2-5.4c-2.2-0.5-3.7-2.5-3.7-4.7c1.2-0.7,2.2-1.8,2.7-3.2"/>
				<path class="st0 color" d="M23,13V6c0-2.8-2.2-5-5-5c-1.7,0-3.2,0.8-4.1,2.1C11.1,3.6,9,6,9,9v4"/>
			</svg>
			{ displayName && <h1>{ teamName }</h1> }
		</div>
    )
}

export default CyclopsToken;