import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import back from './../../files/icons/png.png';

const GoBack: FC = (props) => {
    const navigate = useNavigate()
    return (
        <span className="text-secondary d-flex mb-2 align-items-center"
              style = {{ cursor : "pointer"}}
              onClick={() => navigate(-1)}>
            <img
                className="me-2"
                style={{width: "20px",height : "20px"}} src={back} alt=""/>Назад</span>
    );
}

export default GoBack;