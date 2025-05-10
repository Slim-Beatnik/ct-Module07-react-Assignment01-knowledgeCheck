import InputToggleBtn from './buttons/AddSubToggle.jsx';
import AxeToken from './teamTokens/AxeToken.jsx';
import CyclopsToken from './teamTokens/CyclopsToken.jsx';
import FireToken from './teamTokens/FireToken.jsx';
import HeartToken from './teamTokens/HeartToken.jsx';
import MeepleKingToken from './teamTokens/MeepleKingToken.jsx';
import PokerChipToken from './teamTokens/PokerChipToken.jsx';


function TeamCreationInput({ inputIndex, teamInfo, setTeamInfo, onInputChange }) {
    console.log('bypass: ', setTeamInfo, InputToggleBtn, AxeToken, CyclopsToken, FireToken, HeartToken, MeepleKingToken, PokerChipToken);
    //tokens by id and src
    const teamIcons = [
        <AxeToken color={ `${teamInfo[{inputIndex}].teamColor || "#000"}` } displayName={false}/>,
        <CyclopsToken color={ `${teamInfo.teamColor || "#000"}` } displayName={false}/>,
        <FireToken color={ `${teamInfo.teamColor || "#000"}` } displayName={false}/>,
        <HeartToken color={ `${teamInfo.teamColor || "#000"}` } displayName={false}/>,
        <MeepleKingToken color={ `${teamInfo.teamColor || "#000"}` } displayName={false}/>,
        <PokerChipToken color={ `${teamInfo.teamColor || "#000"}` } displayName={false}/>
    ];

    // color palette for team colors
    const teamColors = {
        'purple': '#8785B7',
        'blue': '#2B3784',
        'red': '#be4748',
        'yellow': '#ebcc0e',
        'grey': '#2b2d31',
        'green': '#55FF55'
    };

    // const [teamInfo, setTeamInfo] = useState(
    //         {
    //             teamName: 'Team 1',
    //             teamColor: '#000',
    //             teamToken: '',
    //             teamQuizDisplay: '',
    //             teamQuizResultsDisplay: ''
    //         }
    //     );

    // handle change function -- SelectionInput prop
    const handleChange = (event) => {
        let { name, value } = event.target;
        
        if (name.includes('teamToken')) {
            name = 'teamToken';
        }
        if (name.includes('teamColor')) {
            name = 'teamColor';
        }
        if (name === 'teamName') {
            name = 'teamName';
        }
        if (value.replace(/[^a-zA-Z]/g, '').toLowerCase().includes('changedlater')) {
            value = 'A team full of Jerks!';
        }

        onInputChange(name, value); // let parent handle actual state update
    }
    

    return (
        <div className="teamCreationInputContainer">
            <div className="nameInputContainer">
                <label htmlFor={ `teamName${inputIndex}` }>Team Name</label>
                <input
                    type="text"
                    id={ `teamName${inputIndex}` }
                    name={ `teamName${inputIndex}` }
                    value={ teamInfo.teamName || 'Team 1' }
                    onChange={ handleChange }
                    title="Enter a team's name"
                    placeholder="Team Name -- cannot be changed later"
                />
            </div>
            <div className="tokenSelection">
                <label htmlFor={ `teamToken${inputIndex}` }>Team Token</label>
                <select
                    id={ `teamToken${inputIndex}` }
                    name={ `teamToken${inputIndex}` }
                    value={ teamInfo.teamToken }
                    onChange={ handleChange }
                    title="Select a team token"
                >
                    { teamIcons.map((icon, i) => {
                        <option key={ i } value={icon}>{icon}</option>;
                    })}
                </select>
            </div>
            <div className="colorSelection">
                {Object.entries(teamColors).map((colorName, colorCode) => (
                    <div
                        key={colorName}
                        id={ `teamColor${inputIndex}` }
                        name={ `teamColor${inputIndex}` }
                        value={ teamInfo.color || '#000' }
                        className={`colorCircle ${teamInfo.color === colorName ? 'selected' : ''}`}
                        style={{ backgroundColor: colorCode, height: '30px', width: '30px' }}
                        onClick={ handleChange }
                    />
                ))}
            </div>
        </div>
    );
}

export default TeamCreationInput;
