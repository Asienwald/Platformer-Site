import React, { useEffect, useState } from 'react';
import '../../../css/misc.css';
import { ISubSection } from '../../../types/interfaces';

const SubSection: React.FC<ISubSection> = ({
    sectionTitle,
    bulletPoints
}) => {
    const [pts, setPts] = useState<JSX.Element[]>([]);

    const initBulletPts = () => {
        let _pts: JSX.Element[] = []
        bulletPoints.map((val) => {
            // console.log(val);
            _pts.push(<div className="col-12 col-lg-6">
                    <ul>
                        <li>{val}</li>
                    </ul>
                </div>)
        })
        setPts(_pts);
    }

    useEffect(() => {
        initBulletPts();
    }, [])

    return (
        <div className="sub-section">
            <p className="color-cyan mb-1">{sectionTitle}</p>
            <hr/>
            <div className="row size-25">
                {pts}
            </div>
        </div>
    );
};



export default SubSection;