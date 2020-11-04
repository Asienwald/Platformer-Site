import React from 'react';
import { useSelector } from 'react-redux';

import "../../css/player.css";
import { AppState } from '../../types/interfaces';

interface IPlayerProps{
    inMenu?: boolean
}

const Player: React.FC<IPlayerProps> = ({inMenu}) => {

    const [isCenter, isRunning, invert] = useSelector((state: AppState) => {
        return [state.env.playerCenter, state.env.moving, state.env.playerInvert]
    })


    return (
        <div className = {
            (isCenter) ? "player center-middle" : "player"
        } style={{
            animationName: (isRunning && !inMenu)? "animate-running": "animate-idle",
            transform: `scaleX(${() => {
                if(invert) return -1;
                else if(invert && isRunning) return 1;
                else return 1.1;
            }})`
        }}>
        </div>
    );
};


export default Player;