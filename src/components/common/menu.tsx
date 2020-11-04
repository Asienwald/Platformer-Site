import React from 'react';
import '../../css/misc.css';
import '../../css/menu.css';
import {motion} from 'framer-motion';
import {Scroll} from 'framer'



const Menu: React.FC = ({children}) => {
    return (
        <Scroll
            height="100%"
            width="100%"
            wheelEnabled={true}
            direction="vertical"
            dragEnabled={true}
            
        >
            <motion.div
                exit={{transform: "scale(0)"}}
                initial={{transform: "scale(0)"}}
                animate={{transform: "scale(1)"}}
                className="container-fluid">

                    <div className="row">
                        <div className="col-11 col-md-10 col-lg-8 ml-auto menu">
                                {children}
                        </div>
                    </div>

                
            </motion.div>
        </Scroll>
        
    );
};


export default Menu;