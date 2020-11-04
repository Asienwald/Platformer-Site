import { CHANGE_ENV, CHANGE_MOVING, SET_BACKWORLD, SET_PLAYER_CENTER, SET_PLAYER_INVERT } from "../actions/actiontypes";
import {IEnvState, TEnvActionTypes} from '../types/interfaces'



const initialEnvState:IEnvState = {
    moving: true,
    playerCenter: true,
    envBg: "forest",
    bgCount: 1,
    bgList: ["forest"],
    backToWorld: false,
    playerInvert: false
}


export default function envReducer(state : IEnvState = initialEnvState, action: TEnvActionTypes){
    switch(action.type){
        case CHANGE_MOVING:
            return {
                ...state,
                moving: action.payload
            }
        case SET_PLAYER_CENTER:
            return{
                ...state,
                playerCenter: action.payload
            
            }
        case CHANGE_ENV:
            return {
                ...state,
                envBg: action.payload
                
            }
        case SET_BACKWORLD:
            return {
                ...state,
                backToWorld: action.payload
                
            }
        case SET_PLAYER_INVERT:
            return {
                ...state,
                playerInvert: action.payload
                
            }
        default:
            return state
    }
}