import React from 'react';

import Ground from './ground';
import Background from './background';
import BackToWorld from './backtoworld';


function Environment() {
    return (
        <div className="w-100 h-100">
            <BackToWorld/>
            
            <Ground/>
            <Background/>  

        </div>
    );
}

export default Environment;