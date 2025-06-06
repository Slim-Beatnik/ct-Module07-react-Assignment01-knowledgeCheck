function AddSubToggle({ isSub, bgTopColor, plusColor, bgBottomColor, onClick, disabled }) {
    const displaySub = isSub ? 'scale(-1, -1)' : 'scale(1)';
    onClick = disabled ? null : onClick;
    return (
        <svg onClick={ onClick } style={{ transform: displaySub }} className="addSubBtn" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
            <path className="color color1 bgTopColor" fill={ bgTopColor } fillRule="oddeven" clipRule="oddeven" d="M2 12C2 16.714 2 19.0711 3.46447 20.5355L20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12Z"  />
            <path className="color color2 plusColor" fill={ plusColor } d="M8 4.75C8.41421 4.75 8.75 5.08579 8.75 5.5L8.75 7.25002H10.5C10.9142 7.25002 11.25 7.58581 11.25 8.00002C11.25 8.41423 10.9142 8.75002 10.5 8.75002H8.75L8.75 10.5C8.75 10.9142 8.41421 11.25 8 11.25C7.58579 11.25 7.25 10.9142 7.25 10.5L7.25 8.75002H5.5C5.08579 8.75002 4.75 8.41423 4.75 8.00002C4.75 7.58581 5.08579 7.25002 5.5 7.25002H7.25V5.5C7.25 5.08579 7.58579 4.75 8 4.75Z" />
            <path className="color color3 bgBottomColor" fill={ bgBottomColor } fillRule="oddeven" clipRule="oddeven" d="M12.0004 21.9999C7.28633 21.9999 4.92931 21.9999 3.46484 20.5354L20.5359 3.46436C22.0004 4.92882 22.0004 7.28584 22.0004 11.9999C22.0004 16.7139 22.0004 19.071 20.5359 20.5354C19.0714 21.9999 16.7144 21.9999 12.0004 21.9999ZM18.0005 17.75C18.4147 17.75 18.7505 17.4142 18.7505 17C18.7505 16.5858 18.4147 16.25 18.0005 16.25H13.0005C12.5863 16.25 12.2505 16.5858 12.2505 17C12.2505 17.4142 12.5863 17.75 13.0005 17.75H18.0005Z" />
        </svg>
    )
}

export default AddSubToggle;