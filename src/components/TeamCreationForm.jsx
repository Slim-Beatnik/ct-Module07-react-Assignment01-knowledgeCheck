import AxeToken from './teamTokens/AxeToken.jsx'
import CyclopsToken from './teamTokens/CyclopsToken.jsx';
import FireToken from './teamTokens/FireToken.jsx';
import HeartToken from './teamTokens/HeartToken.jsx';
import MeepleKingToken from './teamTokens/MeepleKingToken.jsx';
import PokerChipToken from './teamTokens/PokerChipToken.jsx';
import TeamCreationInput from './TeamCreationInput.jsx';
import InputToggleBtn from './buttons/AddSubToggle.jsx';
import { useCallback, useEffect } from 'react';

function TeamCreationForm( { requestTimer, teamInfo, setTeamInfo, teams, setTeams, onPrev, onNext, quizMaster, setHandleSubmit, errorStatus, setErrorStatus } ) {
    console.log('bypass: ', teamInfo, setTeamInfo, teams, setTeams, onPrev, onNext, quizMaster, setHandleSubmit, errorStatus, setErrorStatus);
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


    useEffect(() => {
        if (!requestTimer) {
            setHandleSubmit({func: handleTeamCreationSubmit , btnTitle: 'Set Teams'})
        }
    }, [])


    const handleInputChange = useCallback((index, name, value) => {
        setTeamInfo(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = { ...newInputs[index], [name]: value};
            return newInputs;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const [teamInfo, setTeamInfo] = useState(
    //         {
    //             teamName: 'Team 1',
    //             teamColor: '#000',
    //             teamToken: '',
    //             teamQuizDisplay: '',
    //             teamQuizResultsDisplay: ''
    //         }
    //     );

    const addInput = () => {
        setTeamInfo(prev => [
            ...prev,
            { queryPriority: 'difficulty', category: '', difficulty: '', amount: '' }
        ]);
    }

    const removeInput = (index) => {
        setTeamInfo(prev => prev.filter((_, i) => i !== index));
    }

    const clearForm = () => {
        setTeamInfo(
            [{
                teamName: 'Team 1',
                teamColor: '#000',
                teamToken: '',
                teamQuizDisplay: '',
                teamQuizResultsDisplay: ''
            }]
        );
    }

    const handleTeamCreationSubmit = () => {
        console.log('teamInfo: ', teamInfo);
        // teamInfo.map((info) {
        //     `<${ teamInfo.teamToken } color=\{${ teamInfo.teamColor }\} teamName=\{${ teamInfo.teamName }\} `
        // })
        onNext();
    }

    return (
        <form onSubmit={ handleTeamCreationSubmit } id="teamCreationForm" >
            {
                teamInfo.map((infoData, index) => {
                    <div key={ index } className="inputs" >
                        <div className="inputBtnContainer">
                            <InputToggleBtn isSub={ true } bgTopColor="#1C274D" plusColor="#1C274D" bgBottomColor="#de004a" onClick={ () => removeInput(index) } disabled={ teamInfo.length == 1 } />
                        </div>
                            <TeamCreationInput
                                inputIndex={ index }
                                teamInfo={ infoData }
                                onInputChange={ (name, value) => handleInputChange(index, name, value) }
                                setTeamInfo={ setTeamInfo }
                            />
                            
                    </div>
                })
            }
            <div className="formButton">
                <InputToggleBtn isSub={ false } bgTopColor="#fff" plusColor="#1C274D" bgBottomColor="#1C274D" onClick={ addInput } />
                <button type="button" className="clearFormBtn" onClick={ clearForm }>Clear Form</button>
            </div>
        </form>
    )
}

export default TeamCreationForm;