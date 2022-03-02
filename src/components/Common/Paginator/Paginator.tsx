import React from 'react'
import s from "./Paginator.module.css";


export const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (


        <div>
            {pages.map(p => {
                return <span key={p} className={(currentPage) === p ? s.selectedPage : ""}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}

        </div>
    )
}

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}
