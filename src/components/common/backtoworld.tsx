import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppState } from '../../types/interfaces';
import '../../css/misc.css';

function BackToWorld() {
    const history = useHistory();
    const location = useLocation();

    const showBack = useSelector((state: AppState) => {
        return state.env.backToWorld
    })

    const backToWorld = () => {
        history.push("/worldmap")
    }

    useEffect(() => {
        console.log("Window location changed");
    }, [location])

    return (
        <div className="back-world"
        >
            <div
                onClick={() => {backToWorld()}}
                className = {(showBack) ? "d-flex flex-row text-white show" : "d-flex flex-row text-white hide"}
            >
                <div className="back-world-icon"></div>
                <p className="size-30 my-auto text-left ml-3">back to world map</p>
            </div>
        </div>
    );
}

export default BackToWorld;