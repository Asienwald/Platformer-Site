import { IChangeEnvAction, IChangeMovingAction, ISetBackWorld, ISetPlayerCenter, ISetPlayerInvert } from '../types/interfaces';
import  './actiontypes';
import { CHANGE_ENV, CHANGE_MOVING, SET_BACKWORLD, SET_PLAYER_CENTER, SET_PLAYER_INVERT } from './actiontypes';
 
// env actions
function changeMoving(payload: boolean) : IChangeMovingAction{
    return {
        type: CHANGE_MOVING,
        payload
    }
}

function changeEnvironment(payload: string) : IChangeEnvAction{
    return{
        type: CHANGE_ENV,
        payload
    }
}

function setPlayerCenter (payload: boolean): ISetPlayerCenter{
    return {
        type: SET_PLAYER_CENTER,
        payload
    }
}

function setBackWorld (payload: boolean): ISetBackWorld{
    return{
        type: SET_BACKWORLD,
        payload
    }
}

function setPlayerInvert(payload: boolean): ISetPlayerInvert{
    return{
        type: SET_PLAYER_INVERT,
        payload
    }
}




export const AllActions = {
    EnvActions: {
        changeMoving,
        changeEnvironment,
        setPlayerCenter,  
        setBackWorld,
        setPlayerInvert
    }
}