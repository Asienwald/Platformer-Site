import React from 'react';
import { useSelector } from 'react-redux';
import '../../../css/education.css';
import { AppState, ISchool } from '../../../types/interfaces';
import School from './school';


const Education: React.FC = () => {
    const schoolList: ISchool[] = useSelector((state: AppState): ISchool[] => {
        return state.data.education.schoolList;
    } )

    return (
        <div className="education">

            {
                schoolList.map((sch) => {
                    return (
                        <div>
                            <School
                                schoolName = {sch.schoolName}
                                studyPeriod = {sch.studyPeriod}
                                studyScope = {sch.studyScope}
                                academicComponent = {sch.academicComponent}
                                ccaList = {sch.ccaList}
                                awardsList = {sch.awardsList}
                            /> 

                            <div className="mt-5"></div>
                        </div>
                    )
                })
            }
            
        </div>
    );
}

export default Education;