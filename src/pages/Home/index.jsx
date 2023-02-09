import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

export default function Index() {

    const [page, setPage] = useState(1)
    const [subPage, setSubPage] = useState(1.0)
    const [news, setNews] = useState({})
    const [addNewsDetails, setAddNewsDetails] = useState({})

    useEffect(() => {
        axios.post('https://tsd.shtdevops.xyz/admin/testGetNews', { "page": 0 }).then((res) => {
            setNews(res.data)
        })
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            title: addNewsDetails.title,
            description: addNewsDetails.desc,
            date_added: addNewsDetails.date,
            search_tags: 'ness',
            search_tags: 'iopoiop',
            publish: addNewsDetails.publish,
            featured_image: addNewsDetails.f_image,
            news_image: addNewsDetails.n_images
        }
        console.log({ data: data })

        try {
            axios.post('https://tsd.shtdevops.xyz/admin/testInsertNews', data).then((res) => {
                console.log(res.data)
            })
        } catch (err) {
            console.log(err)
        }
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
                    {
                        page === 1 &&
                        <section className='news'>
                            {subPage === 1.0 && <button className='add-news' onClick={() => setSubPage(1.1)}>Add News</button>}
                            {subPage === 1.0 &&
                                <div>
                                    {news.news_list?.map((item, i) => {
                                        return (
                                            <article key={i}>
                                                <h4>{item.title}</h4>
                                                <p>{item.date_added}</p>
                                                <p>{item.search_tags?.map(e => '#' + e).join(' ')}</p>
                                                <img src={item.featured_image} alt="image" />
                                                <p>{item.description}</p>
                                            </article>
                                        )
                                    })}
                                </div>
                            }
                            {subPage === 1.1 &&
                                <div className='insert-news'>
                                    <form onSubmit={handleSubmit}>
                                        <section className='general-form'>
                                            <label htmlFor="title">
                                                Title
                                                <input type="text" id='title' name='title'
                                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, title: e.target.value })} />
                                            </label>
                                            <label htmlFor="date">
                                                Date
                                                <input type="date" id='date' name='date'
                                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, date: e.target.value })} />
                                            </label>
                                            <label htmlFor="tags">
                                                Search tags
                                                <input type="text" id='tags' name='tags'
                                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, search_tags: e.target.value })} />
                                            </label>
                                            <label htmlFor="publish">
                                                publish
                                                <input type="text" id='publish' name='publish'
                                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, publish: e.target.value })} />
                                            </label>
                                            <label htmlFor="desc">
                                                Description
                                                <textarea type="text" id='desc' name='desc' rows='13'
                                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, desc: e.target.value })} />
                                            </label>
                                        </section>
                                        <section className='images-form'>
                                            <label>
                                                Featured Image
                                            </label>
                                            <div className='images-display'>
                                                <label className='file-upload-button'><span>+</span>
                                                    <input onChange={(e) => setAddNewsDetails({ ...addNewsDetails, f_image: e.target.files })} type="file" name='f-image' hidden />
                                                </label>
                                            </div>
                                            <label >
                                                New Images
                                            </label>
                                            <div className='images-display'>
                                                <label className='file-upload-button'><span>+</span>
                                                    <input onChange={(e) => setAddNewsDetails({ ...addNewsDetails, n_images: e.target.files })} type="file" name='n-images' hidden multiple />
                                                </label>
                                            </div>
                                            <button>Add News</button>
                                        </section>
                                    </form>
                                </div>
                            }
                        </section>
                    }
                </main>
            </section>
        </div>
    )
}