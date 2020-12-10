import * as React from 'react';

interface IModalProps {    
    show: Boolean,
    hideModal: any,
    highScore: Number,
    setUsername: any,
    publishResult: any,
}

interface IModalState {
    show: Boolean,
    username: string,
}


export default class CloseSessionConfirmModal extends React.Component<IModalProps, IModalState>  {
    
    constructor(props: IModalProps) {
        super(props);
        this.state = {
            show : props.show,
            username: "",
        }
        this.hideModal = this.hideModal.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.publishResult = this.publishResult.bind(this);
    }

    componentWillReceiveProps(nextProps: IModalProps){
        this.setState({
            show : nextProps.show,
        })
    };

    hideModal() {
        this.props.hideModal();
        this.setState({
            show: false
        })
    }

    publishResult() {
        console.log(this.state.username.length)
        if(this.state.username.length > 0){
            this.props.hideModal();
            this.props.publishResult();
            this.setState({
                show: false
            })
        }else{
            var ele = document.getElementById('info');
            ele?.classList.remove("d-none")
        }
    }

    private usernameChanged(e: any) {
        if(e.target.value.length>0){
            var ele = document.getElementById('info');
            ele?.classList.add("d-none")
        }
        this.setState({
            username: e.target.value
        });
        this.props.setUsername(e.target.value);
    }

    render() {
        if(this.state.show !== true){
            return(<></>)    
        }
        else{
            return(
                <div>
                    <div onClick={this.hideModal} className="modal-overlay"></div>
                    <div className="close-session-modal-content">
                        <div className="header-container">
                            <div className="text-xl width-left">Publish highscore</div>
                        </div>

                        <div className="body-container ">
                            <div>
                                Do you want to publish your highscore: {this.props.highScore}?
                            </div>
                            <div>
                                <div>Username:</div>
                                <input value={this.state.username} name="email" onChange={this.usernameChanged}
                                        className="py-2 px-4 text-gray-700 "
                                            id="inline-email" type="email" required placeholder="l33thacker"/>
                                            <p id="info" className="d-none text-info">You must put in a name for your highscore</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button onClick={this.hideModal} className="btn btn-secondary">Cancel</button>
                            <button onClick={this.publishResult} className="btn btn-success">Publish result</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}