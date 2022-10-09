import React from "react";
import {Alert} from 'antd';
import './error-indicator.css'

const ErrorIndicator = () => {
    return (
        <div className="error-message">
            <Alert type="error" message="Ошибочька вышла"/>
        </div>
    )
}

export default ErrorIndicator;