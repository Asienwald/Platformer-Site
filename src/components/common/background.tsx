import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import {AppState} from '../../types/interfaces';

// components
import Parallax from './parallax';


function Background() {
    const [background, setBackground] = useState<JSX.Element>(<div></div>)

    const {envBg} = useSelector((state: AppState) => {
        return state.env;
    })


    const spawnBackground = () => {
        setBackground (
            <div>
                <Parallax image={`/assets/${envBg}_bg.png`} index={0} key={`${envBg}-background-1`}/>
                <Parallax image={`/assets/${envBg}_parallax_2.png`} index={24} key={`${envBg}-background-2`}/>
                <Parallax image={`/assets/${envBg}_parallax_3.png`} index={16} key={`${envBg}-background-3`}/>
                <Parallax image={`/assets/${envBg}_parallax_4.png`} index={10} key={`${envBg}-background-4`}/>
            </div>
        )
    }

    useEffect(() => {
        console.log("BACKGOUND CHANGED!")
        spawnBackground()
    }, [envBg])

    return (
        <div>
            {background}
        </div>
    );
}

export default Background;