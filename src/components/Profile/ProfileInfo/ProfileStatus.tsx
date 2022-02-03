import React, {ChangeEvent} from 'react';


type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusType> {
    state: StateType = {
        editMode: false,
        status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    };

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span
                            onDoubleClick={this.activateEditMode.bind(this)}
                        >{this.props.status || "-------"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            onBlur={this.deactivateEditMode.bind(this)}
                            autoFocus={true}
                            value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;