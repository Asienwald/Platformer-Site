import React from 'react';
import PageWithContent from '../pagewithcontent'
import Title from '../../common/title'
import {useSelector} from 'react-redux'
import {AppState} from '../../../types/interfaces'
import '../../../css/misc.css';
import '../../../css/findme.css';


const FindMePage = () => {

    const {email, discord, linkedinLink, githubLink} = useSelector((state: AppState) => {
        return state.data.contact;
    })

    return (
        <div>
            <PageWithContent>
                <Title
                    text="Find Me"
                />

                <div className="row mt-5 findme-container">
                    <div className="col-12 d-flex flex-row text-white mb-4">
                        <i className="fas fa-envelope findme-icon "></i>
                        <p className="size-25 khyay mt-auto">{email}</p>
                    </div>
                    <div className="col-12 d-flex flex-row text-white">
                        <i className="fab fa-discord text-white findme-icon" ></i>
                        <p className="size-25 khyay mt-auto">{discord}</p>
                    </div>
                    <div className=" col-12 d-flex flex-row mt-4">

                        <a target="_blank" href={linkedinLink}>
                            <i className="fab fa-linkedin text-white findme-icon" ></i>
                        </a>

                        <a target="_blank" href={githubLink}>
                            <i className="fab fa-github-square text-white findme-icon" ></i>
                        </a>
                    </div>
                </div>

                
            </PageWithContent>
        </div>
    );
};

export default FindMePage;