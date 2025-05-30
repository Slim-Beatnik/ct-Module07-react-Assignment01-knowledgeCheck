function DirArrow( { pointsRightBool, arrowColor, shadowColor, onClick } ) {

const displayRight = pointsRightBool ? "scale(-1, 1)" : "scale(1)"

    return (
        <svg onClick={ onClick } style={ {mixBlendMode: "hard-light", transform: displayRight }} width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <path id="left-a" d="M2.29289322,0.292893219 C2.68341751,-0.0976310729 3.31658249,-0.0976310729 3.70710678,0.292893219 C4.09763107,0.683417511 4.09763107,1.31658249 3.70710678,1.70710678 L1.70710678,3.70710678 C1.31658249,4.09763107 0.683417511,4.09763107 0.292893219,3.70710678 C-0.0976310729,3.31658249 -0.0976310729,2.68341751 0.292893219,2.29289322 L2.29289322,0.292893219 Z"/>
                <path id="left-c" d="M3.41421356,4 L13.0014708,4 C13.5529433,4 14,4.44771525 14,5 C14,5.55228475 13.5529433,6 13.0014708,6 L3.41421356,6 L5.70710678,8.29289322 C6.09763107,8.68341751 6.09763107,9.31658249 5.70710678,9.70710678 C5.31658249,10.0976311 4.68341751,10.0976311 4.29289322,9.70710678 L0.292893219,5.70710678 C-0.0976310729,5.31658249 -0.0976310729,4.68341751 0.292893219,4.29289322 L4.29289322,0.292893219 C4.68341751,-0.0976310729 5.31658249,-0.0976310729 5.70710678,0.292893219 C6.09763107,0.683417511 6.09763107,1.31658249 5.70710678,1.70710678 L3.41421356,4 Z"/>
            </defs>
            <g fill="none" fillRule="evenodd" transform="translate(5 7)">
                <g transform="translate(3 1)">
                    <mask id="left-b" fill="#fff">
                        <use xlinkHref="#left-a"/>
                    </mask>
                    <use fill="#D8D8D8" fillRule="nonzero" xlinkHref="#left-a"/>
                    <g className="color color2" id="arrowShadowColor" fill={ shadowColor } mask="url(#left-b)">
                        <rect width="100%" height="100%" transform="translate(-8 -8)"/>
                    </g>
                </g>
                <mask id="left-d" fill="#ffffff">
                    <use xlinkHref="#left-c"/>
                </mask>
                <use fill="#000000" fillRule="nonzero" xlinkHref="#left-c"/>
                <g className="color color1" id="ArrowColor" fill={ arrowColor } mask="url(#left-d)">
                    <rect width="100%" height="100%" transform="translate(-5 -7)"/>
                </g>
            </g>
        </svg>
    )
}

export default DirArrow;