import React from 'react';


type ProfileStatusType = {
    status: string
}

export const ProfileStatus = (props: ProfileStatusType) => {

    return (
        <div>
            <div>
                <span>{props.status}</span>
            </div>
            <div>
                <input value={props.status}/>
            </div>
        </div>
    )
}