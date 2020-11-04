import React from 'react';
import '../../css/misc.css';

interface ITitle{
    text: string
}

const Title: React.FC<ITitle> = ({text}) => {
    return (
        <div>
            <h1 className="color-orange size-50 text-left mb-3 title">
                {text}
            </h1>
        </div>
    );
};



export default Title;