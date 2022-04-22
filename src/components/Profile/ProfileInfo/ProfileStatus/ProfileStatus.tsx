import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "../ProfileInfo.module.scss"

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner && setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.statusBlock}>
            {!editMode &&
                <div className={s.status}><b>Status: </b>
                        <span className={props.isOwner ? s.ownerStatus : ''}
                            onClick={activateEditMode}
                        >{props.status || "No status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        value={status}/>
                </div>
            }
        </div>
    )
}

// TYPES
type ProfileStatusType = {
    status: string
    isOwner : boolean
    updateStatus: (status: string) => void
}
