function RestartArrow( { bgColor, arrowColor, onClick } ) {
    return (
        <svg onClick={ onClick } id="restartBtnSvg" fill="#000" height="100%" width="100%"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon flat-color">
            <path className="color color2" fill={ bgColor } id="primary" d="M21.71,7.57,16.43,2.29a1,1,0,0,0-.7-.29H8.27a1,1,0,0,0-.7.29L2.29,7.57a1,1,0,0,0-.29.7v7.46a1,1,0,0,0,.29.7l5.28,5.28a1,1,0,0,0,.7.29h7.46a1,1,0,0,0,.7-.29l5.28-5.28a1,1,0,0,0,.29-.7V8.27A1,1,0,0,0,21.71,7.57Z" ></path>
            <path className='color color1' fill={ arrowColor } id="secondary" d="M10.5,16a1,1,0,0,1-.71-.29l-3-3a1,1,0,0,1,0-1.42l3-3a1,1,0,0,1,1.42,1.42L8.91,12l2.3,2.29a1,1,0,0,1,0,1.42A1,1,0,0,1,10.5,16Zm5.71-.29a1,1,0,0,0,0-1.42L13.91,12l2.3-2.29a1,1,0,0,0-1.42-1.42l-3,3a1,1,0,0,0,0,1.42l3,3a1,1,0,0,0,1.42,0Z" ></path>
        </svg>
    )
}

export default RestartArrow;