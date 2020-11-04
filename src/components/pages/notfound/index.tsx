import React from 'react';

import Panel from '../../common/panel';

function NotFound() {
    return (
        <div>
            <Panel
                title=":( not found"
                descrip={<p className="size-40 mb-3 mt-4">the page you are looking for is either under construction or doesn't exist!</p>}
                remark=""
                btnString="Back to World Map"
            />

        </div>
    );
}

export default NotFound;