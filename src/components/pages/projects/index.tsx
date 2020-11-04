import React from 'react';
import PageWithContent from '../pagewithcontent'
import Title from '../../common/title'
import ProjectCarousel from './projectCarousel';
import ProjectsModal from './projectsModal';

interface match{
    match: any
}

const ProjectsPage: React.FC<match> = ({
    match
}) => {
    const {route} = match.params;

    return (
        <div>
                <PageWithContent>
                    <Title
                        text = "Player Projects"
                    />

                    <ProjectCarousel
                        title="projects"
                        route = {route}
                    />

                </PageWithContent>
                
                <ProjectsModal route={route} key={`projects-modal-${route}`}/>

        </div>
    );
};

export default ProjectsPage;