import teamAxe from '/teamTokens/teamAxe.svg'
import teamCyclops from '/teamTokens/teamCyclops.svg'
import teamFire from '/teamTokens/teamFire.svg'
import teamHeart from '/teamTokens/teamHeart.svg'
import teamMeepleKing from '/teamTokens/teamMeepleKing.svg'
import teamPoker from '/teamTokens/teamPoker.svg'
import InputToggleBtn from '/buttons/addSubToggle.svg';

function TeamCreationForm( teamInfo, setTeamInfo, teams, setTeams, onPrev, onNext, quizMaster, setHandleSubmit, errorStatus, setErrorStatus ) {
    
    const teamIcons = [
        { id: 'axe', src: teamAxe },
        { id: 'cyclops', src: teamCyclops },
        { id: 'fire', src: teamFire },
        { id: 'heart', src: teamHeart },
        { id: 'meepleKing', src: teamMeepleKing },
        { id: 'poker', src: teamPoker }
    ];

    const teamColors = {
        purple: '#8785B7',
        blue: '#2B3784',
        red: '#be4748',
        yellow: '#ebcc0e',
        grey: '#2b2d31',
        green: '#55FF55'
    };


    return (
        <form onSubmit={ handleSubmit } id="teamCreationForm" >
            <TeamInput teamInfo={teamInfo} setTeamInfo={setTeamInfo} teams={teams} setTeams={setTeams} />
        </form>
    )
}

export default TeamCreationForm;