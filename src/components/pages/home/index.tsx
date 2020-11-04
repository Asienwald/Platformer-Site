import React from 'react';
import Panel from '../../common/panel';


function HomePage() {
    return (
        <div>
            <Panel
                title="hi there"
                descrip={<p className="size-40 mb-3 mt-4">Welcome to my platformer site</p>}
                remark="Have Fun!"
                btnString="start"
            />
        </div>
    );
}

export default HomePage;