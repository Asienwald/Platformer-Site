import React from 'react';
import Title from '../../common/title';
import PageWithContent from '../pagewithcontent';
import AchievementsModal from './achievementsmodal';
import CarouselSection from './carouselsection'

interface match{
    match:any
}

const AchievementsPage: React.FC<match> = ({
    match
}) => {
    const {route} = match.params;

    return (
        <div>
            <PageWithContent>
                <Title
                    text="Player achievements"
                />
                <CarouselSection
                    title="awards"
                    route={route}
                />

                <CarouselSection
                    title="certs"
                    route={route}
                />


            </PageWithContent>

            <AchievementsModal route={route} key={`achievements-modal-${route}`}/>
        </div>
    );
};

export default AchievementsPage;