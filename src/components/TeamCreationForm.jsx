import AxeToken from './teamTokens/AxeToken.jsx'
import CyclopsToken from './teamTokens/CyclopsToken.jsx';
import FireToken from './teamTokens/FireToken.jsx';
import HeartToken from './teamTokens/HeartToken.jsx';
import MeepleKingToken from './teamTokens/MeepleKingToken.jsx';
import PokerChipToken from './teamTokens/PokerChipToken.jsx';
import TeamCreationInput from './TeamCreationInput.jsx';

function TeamCreationForm( teamInfo, setTeamInfo, teams, setTeams, onPrev, onNext, quizMaster, setHandleSubmit, errorStatus, setErrorStatus ) {
    console.log('bypass: ', teamInfo, setTeamInfo, teams, setTeams, onPrev, onNext, quizMaster, setHandleSubmit, errorStatus, setErrorStatus, AxeToken, CyclopsToken, FireToken, HeartToken, MeepleKingToken, PokerChipToken, TeamCreationInput);
    // const teamIcons = [
    //     { id: 'axe', src: teamAxe },
    //     { id: 'cyclops', src: teamCyclops },
    //     { id: 'fire', src: teamFire },
    //     { id: 'heart', src: teamHeart },
    //     { id: 'meepleKing', src: teamMeepleKing },
    //     { id: 'poker', src: teamPoker }
    // ];
    
    // const teamColors = {
    //     purple: '#8785B7',
    //     blue: '#2B3784',
    //     red: '#be4748',
    //     yellow: '#ebcc0e',
    //     grey: '#2b2d31',
    //     green: '#55FF55'
    // };


    // return (
    //     <form onSubmit={ handleSubmit } id="teamCreationForm" >
    //         <TeamInput teamInfo={teamInfo} setTeamInfo={setTeamInfo} teams={teams} setTeams={setTeams} />
    //     </form>
    // )
}

export default TeamCreationForm;