import React, {useEffect, useState} from 'react';
import { useSelector} from 'react-redux'
import {Frame, Page} from 'framer';
import {motion} from 'framer-motion';
import { AppState, ICarousel, IProject} from '../../../types/interfaces';
import '../../../css/carousel.css';
import '../../../css/misc.css';
import { Link } from 'react-router-dom';


const ProjectCarousel: React.FC<ICarousel> = ({
    title, route
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [cardPerPage, setCardPerPage] = useState<number>(6);
    const [pagesNum, setPagesNum] = useState<number>(0);

    const carouselItems: IProject[] = useSelector((state: AppState) => {
        return state.data.projects;
    })

    const indicatorSize = 10
    const indicatorPadding = 10
    const indicatorWidth = [...Array(pagesNum)].length * indicatorSize
    const indicatorPaddingTotal = ([...Array(pagesNum)].length - 1) * indicatorPadding
    const indicatorWidthTotal = indicatorWidth + indicatorPaddingTotal
    const indicatorAlpha = 0.3;

    const changePagesNum = () => {
        let extraPage = (carouselItems.length % cardPerPage == 0)? 0: 1;
        setPagesNum((~~(carouselItems.length / cardPerPage) == 0)? 1 : ~~(carouselItems.length / cardPerPage) + extraPage)
    } 

    useEffect(() => {
        changePagesNum();
    }, [])

    useEffect(() => {
        changePagesNum()
    }, [cardPerPage])

    useEffect(() => {
        if(window.innerWidth < 500){
            setCardPerPage(2);
        }
        else if(window.innerWidth < 900){
            setCardPerPage(4);
        }else{
            setCardPerPage(6);
        }
    }, [window.innerWidth])


    return (
        <div className="project-carousel size-40">
            <div className="d-flex flex-row justify-content-between">
                <p className="color-cyan mb-1 text-left">{title}</p>
                <div className="d-flex flex-row">
                    <motion.div
                        whileTap={{
                            scale: 0.8
                        }}
                    >
                        <img
                            src="/assets/cyan_arrow.png"
                            style={{
                                transform: "rotate(90deg)"
                            }}
                            className="carousel-btn "
                            onClick={() => {
                                ((currentPage - 1) < 0)?setCurrentPage(pagesNum - 1): setCurrentPage(currentPage -1)
                            }}
                        />
                    </motion.div>
                    
                    <div className=" indicator-wrapper">
                        {[...Array(pagesNum)].map((val, index) => {
                            return (
                                <Frame
                                    // Visual & layout
                                    size={indicatorSize}
                                    radius={30}
                                    backgroundColor="#02FFF0"
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
                            src="/assets/cyan_arrow.png"
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
            </div>
           
            <hr/>

            <Page
                defaultEffect="wheel"
                currentPage={(currentPage)?currentPage:0}
                // this is for indicators
                onChangePage={(current, previous) => {
                    setCurrentPage(current)
                }}
                center={false}
                className=" page-container"
                padding={0}
            >

                {
                    [...Array(pagesNum)].map((val, index) => {
                        let startIndex = (index == 0)? 0 : index * cardPerPage;
                        let _carouselItems = carouselItems.slice(startIndex, startIndex + cardPerPage)
                        return <div  className="row p-0 m-0 w-100 h-100">
                            {
                                _carouselItems.map((item: IProject) => {
                                    return(route != item.projectRoute && <div className="col-12 col-md-6 col-lg-4 card-col">
                                            <Link to={`/projects/${item.projectRoute}`}>
                                                <motion.div className="card text-center px-3 pt-2"

                                                    layoutId={`project-container-${item.projectRoute}`}
                                                    style={{cursor: 'pointer'}}
                                                    key={item.projectRoute}
                                                >
                                                    <motion.div className="card-img"
                                                        layoutId={`project-image-${item.projectRoute}`}>
                                                        <motion.img
                                                            src={`/assets/projects/${item.imageUrlList[0]}.jpg`}
                                                            onError = {(e:any) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "/assets/default.jpg";
                                                            }}
                                                            layoutId={`${item.imageUrlList[0]}-${item.projectRoute}`}
                                                            key={`${item.imageUrlList[0]}-${item.projectRoute}`}
                                                        />
                                                    </motion.div>
                        
                                                    <div className="mt-2">
                                                        <p className="size-30 color-red">{item.projectTitle}</p>
                                                        <p className="size-20 color-grey">
                                                            {
                                                                item.tags.join(", ")
                                                            }
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                                
                                            </div>
                                )})  
                            }
                        </div>
                    })
                }
            </Page>
            
            
        </div>
    );
};

export default ProjectCarousel;