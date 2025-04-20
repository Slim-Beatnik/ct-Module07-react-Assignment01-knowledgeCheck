import InputToggleBtn from '/buttons/addSubToggle.svg';
import teamAxe from '/teamTokens/teamAxe.svg';
import teamCyclops from '/teamTokens/teamCyclops.svg';
import teamFire from '/teamTokens/teamFire.svg';
import teamHeart from '/teamTokens/teamHeart.svg';
import teamMeepleKing from '/teamTokens/teamMeepleKing.svg';
import teamPoker from '/teamTokens/teamPoker.svg';

function TeamInput({ teamInfo, setTeamInfo, teams, setTeams }) {
    // tokens by id and src
    const teamIcons = [
        { id: 'axe', src: teamAxe },
        { id: 'cyclops', src: teamCyclops },
        { id: 'fire', src: teamFire },
        { id: 'heart', src: teamHeart },
        { id: 'meepleKing', src: teamMeepleKing },
        { id: 'poker', src: teamPoker }
    ];

    // color palette for team colors
    const teamColors = {
        purple: '#8785B7',
        blue: '#2B3784',
        red: '#be4748',
        yellow: '#ebcc0e',
        grey: '#2b2d31',
        green: '#55FF55'
    };

    //teamQuizDisplay: `<img src=${ this.teamToken } style={{ fill: ${ this.teamColor } + ' !important' }} />`,
    //teamQuizResultsDisplay: `<div>${ this.teamQuizDisplay } <br> <p style={{ fontSize: '1rem', color: ${ this.teamColor } + '!important }}>${ this.teamName }</p></div>`

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleTokenSelection = (token) => {
        setTeamInfo(prev => ({ ...prev, token }));
    };

    const handleColorSelection = (color) => {
        setTeamInfo(prev => ({ ...prev, color }));
    };

    const addTeam = () => {
        if (Object.values(teamInfo).some(value => value.trim() === '')) {
            alert('You must fill out all fields.');
            return;
        }

        const duplicate = teams.some(team =>
            team.token === teamInfo.token && team.color === teamInfo.color
        );

        if (duplicate) {
            alert('That token and color combo is already taken!');
            return;
        }

        setTeams(prev => [...prev, teamInfo]);
        setTeamInfo({ teamName: '', token: '', color: '' });
    };

    const removeTeam = (index) => {
        const updatedTeams = teams.filter((_, i) => i !== index);
        setTeams(updatedTeams);
    };

    return (
        <div className="teamCreationInput">
            <div className="teamInputContainer">
                <input
                    type="text"
                    name="teamName"
                    value={teamInfo.teamName}
                    onChange={handleInputChange}
                    placeholder="Team Name"
                />

                <div className="tokenSelection">
                    {teamIcons.map(({ id, src }) => (
                        <option
                            key={id}
                            src={src}
                            alt={id}
                            className={teamInfo.token === id ? 'selected' : ''}
                            onClick={() => handleTokenSelection(id)}
                            style={{ filter: teamInfo.color ? `drop-shadow(0 0 8px ${teamColors[teamInfo.color]})` : 'none' }}
                        />
                    ))}
                </div>

                <div className="colorSelection">
                    {Object.entries(teamColors).map(([colorName, colorCode]) => (
                        <div
                            key={colorName}
                            className={`colorCircle ${teamInfo.color === colorName ? 'selected' : ''}`}
                            style={{ backgroundColor: colorCode, height: '30px', width: '30px' }}
                            onClick={() => handleColorSelection(colorName)}
                        />
                    ))}
                </div>

                <input
                    src={InputToggleBtn}
                    alt="Add Team"
                    className="inputToggleBtn"
                    onClick={addTeam}
                />
            </div>

            <div className="teamList">
                {teams.map((team, index) => (
                    <div key={index} className="teamCard">
                        <h3>{team.teamName}</h3>
                        <img src={teamIcons.find(icon => icon.id === team.token).src} alt={team.token} />
                        <p style={{ color: teamColors[team.color] }}>{team.color}</p>
                        <img
                            src={InputToggleBtn}
                            alt="Remove Team"
                            className="inputToggleBtn rotate"
                            onClick={() => removeTeam(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamInput;
