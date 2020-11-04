import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { AppState, IAchievement } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAchievement } from '../../../actions/selectors';
import '../../../css/modal.css'
import '../../../css/misc.css'

interface IAchievementsModal{
    route:string
}

const AchievementsModal: React.FC<IAchievementsModal> = ({route}) => {
    const history = useHistory();

    const {achievementRoute, issueDate, title, issuedBy, descripList} = useSelector((state: AppState): IAchievement => {
        return getAchievement(state.data, route);
    })

    if(route && achievementRoute == ""){
        history.push("/notfound");
    }

    return (
        <div className="achievements-modal my-modal">
            <AnimatePresence>
                {(route && 
                        <motion.div
                            className="modal-container"
                            exit={{transform: "scale(0)"}}
                            initial={{transform: "scale(0)"}}
                            animate={{transform: "scale(1)"}}
                            layoutId={`achievement-container-${route}`}
                            key = {`achievements-modal-${route}`} 
                        >
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <motion.div className="left-view"
                                        layoutId={`achievement-image-${route}`}
                                    >
                                        <img
                                            src={`/assets/achievements/${achievementRoute}.jpg`}
                                            onError = {(e:any) => {
                                                e.target.onerror = null;
                                                e.target.src = "/assets/default.jpg";
                                            }}
                                            className="selected-img"
                                        />
                                    </motion.div>
                                </div>
                                <div className="col-12 col-lg-6 text-left">
                                    <motion.div className="right-view khyay"
                                    >
                                        <p className="color-grey size-20">{issueDate}</p>
                                        <p className="size-40">{title}</p>
                                        <p className="size-20 color-grey">{issuedBy}</p>
                                        <div style={{height: "8vh"}}></div>
                                        <div className="descrip-container color-darkgrey khyay size-15">
                                            {
                                                descripList.map((val) => {
                                                    return <p>{val}</p>
                                                })
                                            }
                                        </div>
                                    </motion.div>
                                    

                                </div>
                            </div>

                            <motion.div className="modal-cross"
                                whileHover={{
                                    scale: 1.2
                                }}
                                whileTap={{
                                    scale: 0.8
                                }}
                            >
                                <Link to="/achievements">
                                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="240px" height="240px"><path d="M25.707,6.293c-0.195-0.195-1.805-1.805-2-2c-0.391-0.391-1.024-0.391-1.414,0c-0.195,0.195-17.805,17.805-18,18c-0.391,0.391-0.391,1.024,0,1.414c0.279,0.279,1.721,1.721,2,2c0.391,0.391,1.024,0.391,1.414,0c0.195-0.195,17.805-17.805,18-18C26.098,7.317,26.098,6.683,25.707,6.293z"/><path d="M23.707,25.707c0.195-0.195,1.805-1.805,2-2c0.391-0.391,0.391-1.024,0-1.414c-0.195-0.195-17.805-17.805-18-18c-0.391-0.391-1.024-0.391-1.414,0c-0.279,0.279-1.721,1.721-2,2c-0.391,0.391-0.391,1.024,0,1.414c0.195,0.195,17.805,17.805,18,18C22.683,26.098,23.317,26.098,23.707,25.707z"/></svg>
                                </Link>
                                
                            </motion.div>
                        </motion.div>
                    )
                }

            </AnimatePresence>
        </div>
    );
};

export default AchievementsModal;