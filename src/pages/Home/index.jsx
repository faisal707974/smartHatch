import React, { useEffect, useState } from 'react'
import './index.scss'

import Component from '../../components/SampleComponent'

export default function Index() {

    const [notification, setNotification] = useState('')
    const [page, setPage] = useState(1)



    function notificationHandle(text) {
        setNotification(text)
        setTimeout(() => {
            setNotification('')
        }, 2000);
    }

    const Props = {
        notification,
        notificationHandle
    }



    return (
        <div className='Home'>
            <section className='navigation-bar'>
                <nav>
                    <ul>
                        <li className={page === 1 ? 'selected' : ''} onClick={() => setPage(1)}>News</li>
                        <li className={page === 2 ? 'selected' : ''} onClick={() => setPage(2)}>Events</li>
                    </ul>
                </nav>
            </section>
            <section className='content'>
                <header></header>
                <main>
                    {page === 1 && <Component Props page='News' />}
                    {page === 2 && <Component Props page='Events' />}
                </main >
            </section >
            {notification &&
                <div className='notification'>
                    <p>{notification}</p>
                </div>
            }
        </div >
    )
}