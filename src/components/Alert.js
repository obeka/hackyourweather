import React from 'react';
import './Alert.css';
import { BsExclamationTriangleFill } from "react-icons/bs";

const Alert = ({hasError}) => {    
    return (
        <>
            <p className={hasError.type === 'duplicate' ? 'alert error' : 'danger error'}> <BsExclamationTriangleFill className='icon'/>  Oops.. {hasError.text.message} {hasError.text.cod} <BsExclamationTriangleFill className='icon'/></p>
        </>
    )
}

export default Alert;
