import React from 'react';
import Title from '../../common/title';
import PageWithContent from '../pagewithcontent';
import Education from './education';

function EducationPage() {

    return (
        <div>
            <PageWithContent>
                <Title
                    text = "player education"
                />
                <Education/>
            </PageWithContent>
        </div>
    );
}

export default EducationPage;