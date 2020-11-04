import React from 'react';
import { useSelector } from 'react-redux';
import { AppState, IPosition } from '../../../types/interfaces';
import Title from '../../common/title';
import PageWithContent from '../pagewithcontent';
import Position from './position';

const ExperiencePage: React.FC = () => {
    const positionList: IPosition[] = useSelector((state: AppState):IPosition[] => {
        return state.data.experience.positionList;
    })

    return (
        <div>
            <PageWithContent>
                <Title
                    text = "player experience"
                />
                {
                    positionList.map((pos: IPosition) => {
                        return (
                            <Position
                                role = {pos.role}
                                division = {pos.division}
                                organisation = {pos.organisation}
                                positionPeriod = {pos.positionPeriod}
                                descriptionList = {pos.descriptionList}
                            />
                        )
                    })
                }
            </PageWithContent>
        </div>
    );
}


export default ExperiencePage;