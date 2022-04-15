import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../../Redux/users-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {getUsersFilter} from "../../../Redux/Selectors/users-selectors";
import s from "./UsersSearchForm.module.css"

const usersSearchFormValidate = (values: FormType) => {
    const errors = {};
    return errors;
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector<AppStateType, FilterType>(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form className={s.formContainer}>
                        <Field type="text" name="term" placeholder={"Search 🔎"} className={s.searchInput}/>
                        <Field name="friend" as="select" className={s.select}>
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

// TYPES
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null'
type FormType = {
    term: string,
    friend: FriendFormType
}


