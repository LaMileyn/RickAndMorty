import React, {FC} from 'react';
import image from './../../files/icons/rolling.gif'
const Loader : FC = (props) => {
    return (
        <img src={image} style = {{ width : "100%", height : "100%", objectFit : "contain"}} />
    );
}

export default Loader;