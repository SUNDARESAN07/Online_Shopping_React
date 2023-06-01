import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const NavigateButton = ( { buttonTitle,buttonStyle,route,isReplaced,variant,data}) => {
    const navigate = useNavigate();
    return (
        <Button
        style={buttonStyle} variant={variant}
            onClick = { () => { 
                navigate( route , {replace:isReplaced,state:{data}} )
            }}
        >
            {buttonTitle}
        </Button>
        );
    }
export default NavigateButton;