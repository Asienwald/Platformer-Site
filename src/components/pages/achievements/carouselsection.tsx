import React, { useEffect, useState } from 'react';
import '../../../css/misc.css'
import '../../../css/carousel.css'
import { Frame, Page} from 'framer'
import {motion} from 'framer-motion'
import {  ICarousel, IAchievement, AppState } from '../../../types/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'


const CarouselSection: React.FC<ICarousel> = ({
    title,
    route
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [cardPerPage, setCardPerPage] = useState<number>(3);
    const [pagesNum, setPagesNum] = useState<number>(0);

    const dispatch = useDispatch();

    // let carouselItems: IAchievement[] = [];
    const carouselItems: IAchievement[] = useSelector((state: AppState) => {
        if(title.includes("awards")) return state.data.achievements.awards;
        else return state.data.achievements.certs;
    })


    const indicatorSize = 10
    const indicatorPadding = 10
    const indicatorWidth = [...Array(pagesNum)].length * indicatorSize
    const indicatorPaddingTotal = ([...Array(pagesNum)].length - 1) * indicatorPadding
    const indicatorWidthTotal = indicatorWidth + indicatorPaddingTotal
    const indicatorAlpha = 0.3

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
        if(window.innerWidth < 900){
            // console.log("window smol!")
            setCardPerPage(2);
        }else{
            setCardPerPage(3);
        }
    }, [window.innerWidth])

    return (
        <div className="carousel-section size-40">
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
                className=" page-container "
                padding={0}
            >

                {
                    [...Array(pagesNum)].map((val, index) => {
                        let startIndex = (index == 0)? 0 : index * cardPerPage;
                        let _carouselItems = carouselItems.slice(startIndex, startIndex + cardPerPage)

                        return <div  className="row p-0 m-0 h-100 w-100">
                            {
                                _carouselItems.map((item: IAchievement) => {
                                    return(route != item.achievementRoute && <div className="col-12 col-md-6 col-lg-4 card-col">
                                                <Link to={`/achievements/${item.achievementRoute}`}>
                                                    <motion.div className="card text-center px-3 pt-2"
                                                        layoutId={`achievement-container-${item.achievementRoute}`}
                                                        style={{cursor: 'pointer'}}
                                                        key={item.achievementRoute}
                                                    >
                                                        <motion.div className="card-img"
                                                            layoutId={`achievement-image-${item.achievementRoute}`}
                                                        >
                                                            <img
                                                                src={`/assets/achievements/${item.achievementRoute}.jpg`} 
                                                                onError = {(e:any) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "/assets/default.jpg";
                                                                }}
                                                            />
                                                        </motion.div>
                            
                                                        <div className="mt-2">
                                                            <p className="size-30 color-red">{item.title}</p>
                                                            <p className="size-20 color-grey">{item.issuedBy}</p>
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

export default CarouselSection;