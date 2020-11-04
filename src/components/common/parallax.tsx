import React, { useEffect, useState } from 'react';
import '../../css/background.css';
import '../../css/misc.css';
import {AppState, IParallax} from './../../types/interfaces'
import {useSelector} from 'react-redux'

const Parallax: React.FC<IParallax> = ({image, index, children}) => {
    const [bg, setBg] = useState<JSX.Element[]>([]);

    const {moving} = useSelector((state: AppState) => {
        return state.env;
    })

    const spawnParallax = (start: number) => {
        if(!moving){
            let spawnedBg = <div 
                className="parallax" 
                style={{
                    right: `${start}vw`,
                    backgroundImage: `url('${image}')`,
                    animationPlayState: "paused"
                }}
            ></div>
            
            return spawnedBg;
        }else{
            let spawnedBg = <div 
                className="parallax" 
                style={{
                    right: `${start}vw`,
                    backgroundImage: `url('${image}')`,
                    animationDuration: `${index}s`,
                    animationPlayState: "running"
                }}
            ></div>

            return spawnedBg;
        }
    }

    const spawnBackground = () => {
        let _bg = [];
        _bg.push(spawnParallax(0));
        _bg.push(spawnParallax(-100));
        setBg(_bg);
    }

    useEffect(() => {
        spawnBackground();
    }, [])

    useEffect(() => {
        spawnBackground();
    }, [moving])


    return (
        <div className="w-100 h-100">
            {bg}
        </div>
    );
};


export default Parallax;