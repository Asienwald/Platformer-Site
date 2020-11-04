import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/homepanel.css';
import '../../css/misc.css';
import {motion} from 'framer-motion';

interface IPanel{
    title: string,
    descrip: any,
    remark: string,
    btnString: string
}


const Panel: React.FC<IPanel> = ({
    title, descrip, remark, btnString
}) => {

    const [menuBoard, setMenuBoard] = useState<string>("/assets/menu_1.png");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fadeIn = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1
        }
    }

    useEffect(() => {
        // console.log(window.innerWidth)
        function handleResize(){
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)   
        }
        
    })

    useEffect(() => {
         if(window.innerWidth < 500){
            setMenuBoard("/assets/menu_1_mobile.png");
        }else{
            setMenuBoard("/assets/menu_1.png");
        }
    }, [windowWidth])


    return (
        <div className="container-fluid">
            <div className="row">
                <motion.div className="col-12 col-md-10 col-lg-5 mx-auto position-relative home-panel d-flex flex-col justify-content-end"
                    animate={{
                        marginTop: ["-60vh", "-20vh", "-24vh", "-20vh"]
                    }}
                    transition={{
                        duration: .8,
                        ease: "easeOut",
                        times: [0, 0.8, 0.9, 1]      
                    }}
                >
                    <div className="m-0 p-0 w-100 menu-chains "></div>
                    <div className="m-0 p-0 menu-board-wrapper w-100 d-flex justify-content-end">
                        <div className="h-100 w-100 d-flex flex-column justify-content-end text-white p-0 mt-auto">
                            <img src={menuBoard} className="board-menu"/>

                            <div className="menu-text w-100 ">
                                <div className="mx-5">
                                    {(window.location.pathname=="/")?<h1 className="size-60">{title}</h1>:<h1 className="size-60 color-red">{title}</h1>}
                                    {descrip}
                                    <p className="mt-3 size-30 color-orange">{remark}</p>
                                    
                                    <motion.div
                                        className="p-0 m-0 mb-3 mt-2"
                                        onClick={() => {
                                        }}
                                        variants={fadeIn}
                                        initial="hidden"
                                        animate="show"
                                        transition={{
                                            delay: 1,
                                            duration: 1.4,
                                            ease: "easeOut"  
                                        }}
                                        
                                    >
                                        <Link
                                            className="start-btn size-40"

                                            to="/worldmap"
                                        >{btnString}</Link>
                                    </motion.div>
                                    
                                    
                                </div>
                               
                            </div>
                            
                        </div>
                    </div>
                   
                    
                </motion.div>
            </div>
        </div>
    );
}

export default Panel;