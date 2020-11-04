import { AnimatePresence, motion } from 'framer-motion';
import {Frame, Page} from 'framer';
import React, { useEffect, useState } from 'react';
import '../../../css/modal.css'
import '../../../css/carousel.css'
import '../../../css/misc.css'
import { AppState, IProject } from '../../../types/interfaces';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import {getProject} from '../../../actions/selectors';


interface IProjectsModal{
    route: string
}

// framer motion variants
const textMotion = {
    rest:{
        color: "inherit",
        x: "-3vw"
    },
    hover: {
        color: "blue",
        x: 0
    }
}

const arrowMotion = {
    rest: {
        opacity: 0,
    },
    hover: {
        opacity: 1,
        marginRight: "2vw",
        color: "blue"  
    }
}


const ProjectsModal: React.FC<IProjectsModal> = ({
    route
}) => {
    const history = useHistory();

    const [selectedImage, setSelectedImage] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [cardPerPage, setCardPerPage] = useState<number>(3);
    const [pagesNum, setPagesNum] = useState<number>(0);

    const indicatorSize = 10
    const indicatorPadding = 10
    const indicatorWidth = [...Array(pagesNum)].length * indicatorSize
    const indicatorPaddingTotal = ([...Array(pagesNum)].length - 1) * indicatorPadding
    const indicatorWidthTotal = indicatorWidth + indicatorPaddingTotal
    const indicatorAlpha = 0.3;

    console.log(route);
    

    const {
        projectRoute,
        imageUrlList,
        projectTitle,
        projectPeriod,
        tags,
        builtWith,
        projectLink,
        descripList
    } = useSelector((state: AppState): IProject => {
        return getProject(state.data, route);
    })

    const changePagesNum = () => {
        let extraPage = (imageUrlList.length % cardPerPage == 0)? 0: 1;
        setPagesNum((~~(imageUrlList.length / cardPerPage) == 0)? 1 : ~~(imageUrlList.length / cardPerPage) + extraPage)
    }

    useEffect(() => {
        changePagesNum();
    }, [])

    useEffect(() => {
        changePagesNum()
    }, [cardPerPage])

    useEffect(() => {
        if(route && projectRoute == ""){
            history.push("/notfound");
        }
    }, [route])

    useEffect(() => {
        if(window.innerWidth < 900){
            setCardPerPage(2);
        }else{
            setCardPerPage(3);
        }
    }, [window.innerWidth])

    useEffect(() => {
        if(imageUrlList.length > 0){
            setSelectedImage(imageUrlList[0]);
        }
    }, [imageUrlList])
    


    return (
        <div className="projects-modal my-modal">
            <AnimatePresence>
                {(route &&
                    <motion.div
                        className="modal-container"
                        exit={{transform: "scale(0)"}}
                        initial={{transform: "scale(0)"}}
                        animate={{transform: "scale(1)"}}
                        layoutId={`project-container-${route}`}
                        key = {`projects-modal-${route}`}  
                    >
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <motion.div className="left-view "
                                    layoutId={`project-image-${route}`}
                                >   
                                    <AnimatePresence exitBeforeEnter>
                                        <motion.img
                                            key={`${selectedImage}-${projectRoute}`}
                                            // layoutId={selectedImage}
                                            exit={{scale: 0.8}}
                                            initial={{scale: 0.8}}
                                            animate={{scale: 1}}
                                            className="selected-img"
                                            onError = {(e:any) => {
                                                e.target.onerror = null;
                                                e.target.src = "/assets/default.jpg";
                                            }}
                                            src={`/assets/projects/${selectedImage}.jpg`}  
                                        />
                                    </AnimatePresence>
                                    
                                    <div className=" p-0">
                                        <Page  
                                            defaultEffect="wheel"
                                            currentPage={(currentPage)?currentPage:0}
                                            // this is for indicators
                                            onChangePage={(current, previous) => {
                                                setCurrentPage(current)
                                            }}
                                            center={false}
                                            className=" page-container mx-auto"
                                            padding={0}
                                        >
                                            {
                                                [...Array(pagesNum)].map((val, index) => {
                                                    let startIndex = (index == 0)? 0 : index * cardPerPage;
                                                    let _images = imageUrlList.slice(startIndex, startIndex + cardPerPage)

                                                    return <div  className="row p-0 m-0 w-100 h-100">
                                                        {
                                                            _images.map((src) => {
                                                                return(<div className="col-6 col-md-6 col-lg-4 card-col"
                                                                            onClick={() => {
                                                                                setSelectedImage(src);
                                                                            }}
                                                                        >
                                                                            <img src={`/assets/projects/${src}.jpg`}
                                                                            style={{
                                                                                backgroundSize: "cover"
                                                                            }}
                                                                            className=""
                                                                            onError = {(e:any) => {
                                                                                e.target.onerror = null;
                                                                                e.target.src = "/assets/default.jpg";
                                                                            }}
                                                                            key={`projcarousel-${src}`}
                                                                            
                                                                            />
                                                                            
                                                                        </div>
                                                            )})
                                                        }
                                                    </div>
                                                })
                                            }

                                        </Page>

                                    </div>
                                    
                                    <div className="carousel-controls d-flex flex-row justify-content-center ">
                                        <motion.div
                                            whileTap={{
                                                scale: 0.8
                                            }}
                                        >
                                            <img
                                                src="/assets/white_arrow.png"
                                                style={{
                                                    transform: "rotate(90deg)"
                                                }}
                                                className="carousel-btn"
                                                onClick={() => {
                                                    ((currentPage - 1) < 0)?setCurrentPage(pagesNum - 1): setCurrentPage(currentPage -1)
                                                }}
                                            />
                                        </motion.div>
                                        <div className=" indicator-wrapper  ">
                                            {[...Array(pagesNum)].map((val, index) => {
                                                return (
                                                    <Frame
                                                        // Visual & layout
                                                        size={indicatorSize}
                                                        radius={30}
                                                        backgroundColor="#575757"
                                                        top="1vh"
                                                        style={{
                                                            cursor: "pointer",
                                                            left: `calc(50% + ${index} * ${indicatorSize +
                                                            indicatorPadding}px)`
                                                        }}
                                                        x={-indicatorWidthTotal / 2}
                                                        // Animation
                                                        opacity={indicatorAlpha}
                                                        animate={{
                                                            opacity: currentPage === index ? 1 : indicatorAlpha
                                                        }}
                                                        // Required by React
                                                        key={index}
                                                        onClick={() => {
                                                            setCurrentPage(index)
                                                        }}
                                                        className=""
                                                        drag={false}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <motion.div
                                            whileTap={{
                                                scale: 0.8
                                            }}
                                        >
                                            <img
                                                src="/assets/white_arrow.png"
                                                style={{
                                                    transform: "rotate(-90deg)"
                                                }}
                                                className="carousel-btn"
                                                onClick={() => {
                                                    ((currentPage + 1) >= pagesNum)? setCurrentPage(0) : setCurrentPage(currentPage + 1)
                                                }}
                                            />
                                        </motion.div>
                                    </div>

                                    

                                </motion.div>
                            </div>
                            <div className="col-12 col-lg-6 text-left">
                                <motion.div className="right-view khyay"
                                >
                                    <p className="color-grey size-20">{projectPeriod}</p>
                                    <a href={projectLink} target="_blank">  
                                        <motion.div className="d-flex flex-row"
                                            whileHover="hover"
                                            whileTap="hover"
                                            initial="rest"
                                        > 
                                                <motion.div className=""
                                                    variants={arrowMotion}
                                                >
                                                    <img src="/assets/double_arrow.svg"
                                                        className="link-icon"
                                                    />
                                                </motion.div>
                                                <motion.div variants={textMotion}>
                                                    <p className="size-40 khyay">{projectTitle}</p>
                                                </motion.div>
                                            
                                        </motion.div>
                                    </a>
                                    
                                    
                                    
                                    <p className="size-20 color-grey">{
                                        tags.join(", ")
                                    }</p>

                                    <div className="khyay built-with-wrapper">
                                        <p className="size-20">Built With</p>
                                        <ul >
                                            {
                                                builtWith.map((val) => {
                                                    return <li className="size-15">{val}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
       
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
                            <Link to="/projects">
                                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="240px" height="240px"><path d="M25.707,6.293c-0.195-0.195-1.805-1.805-2-2c-0.391-0.391-1.024-0.391-1.414,0c-0.195,0.195-17.805,17.805-18,18c-0.391,0.391-0.391,1.024,0,1.414c0.279,0.279,1.721,1.721,2,2c0.391,0.391,1.024,0.391,1.414,0c0.195-0.195,17.805-17.805,18-18C26.098,7.317,26.098,6.683,25.707,6.293z"/><path d="M23.707,25.707c0.195-0.195,1.805-1.805,2-2c0.391-0.391,0.391-1.024,0-1.414c-0.195-0.195-17.805-17.805-18-18c-0.391-0.391-1.024-0.391-1.414,0c-0.279,0.279-1.721,1.721-2,2c-0.391,0.391-0.391,1.024,0,1.414c0.195,0.195,17.805,17.805,18,18C22.683,26.098,23.317,26.098,23.707,25.707z"/></svg>
                            </Link>  
                            
                        </motion.div>
                        
                    </motion.div>
                    
                )}

            </AnimatePresence>
        </div>
    );
};

export default ProjectsModal;