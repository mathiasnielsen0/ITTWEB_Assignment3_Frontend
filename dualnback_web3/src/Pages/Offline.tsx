import React from "react";

interface IProps {
    
}
interface IState {
    
}

export  default class Offline extends React.Component<IProps, IState>{
    
    render(){
        return (
            <div>
                <p>
                    This page is not available when offline
                </p>
            </div>
        );
}
    
}