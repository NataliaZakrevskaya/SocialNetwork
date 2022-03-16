import {Preloader} from "../../Common/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../Redux/profile-reducer";
import React from "react";
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";

// TYPES
type ProfileDataFormPropsType = {
    profile: ProfileType
}


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({handleSubmit, profile}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>

            <div>
                <b>Full name: </b> {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b>               {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>

                <div>
                    <b>My professional skills: </b>
                    {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
                </div>

            <div>
                <b>About me: </b> {profile.aboutMe}
                {createField("About me", "aboutMe", [], Textarea)}
            </div>
            {/*<div>
                <b>Contacts: </b> {Object.keys(profile.contacts)
                .map(key => {
                    return <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>*/}

        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({form: 'edit-profile'})(ProfileDataForm)




export default ProfileDataReduxForm;