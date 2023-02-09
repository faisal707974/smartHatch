import React, { useState, useEffect } from 'react'
import './index.scss'
import moment from 'moment'
import { deleteNews, getAllEvents, getAllNews, insertNews, updateNews } from '../../api'

import delete_icon from '../../images/delete.png'
import edit_icon from '../../images/edit.png'

export default function Index(props) {


    const {
        notification,
        notificationHandle,
        page
    } = props

    const [subPage, setSubPage] = useState(1.0)
    const [news, setNews] = useState({})
    const [events, setEvents] = useState({})
    const [addNewsDetails, setAddNewsDetails] = useState({
        title: '', date: '', search_tags: '', publish: '', desc: '', 'f-image': '', 'n-images': []
    })


    useEffect(() => {
        if (page === 'News') {
            getAllNews({ page: 0 })
                .then((res) => setNews(res.data))
                .catch((err) => console.log({ getNews_error: err }))
        } else {
            getAllEvents({ page: 0 })
                .then((res) => setEvents(res.data))
                .catch((err) => console.log({ getEvents_error: err }))
        }
    }, [notification])

    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            title: addNewsDetails.title,
            description: addNewsDetails.desc,
            date_added: addNewsDetails.date,
            'search_tags[0]': 'ness',
            'search_tags[1]': 'iopoiop',
            publish: addNewsDetails.publish,
            featured_image: addNewsDetails.f_image,
            news_image: addNewsDetails.n_images
        }

        insertNews(data)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log({ insertion_error: err }) })
    }

    async function handleDeletion(id) {
        deleteNews(id)
            .then((res) => { notificationHandle(res.data.message) })
            .catch((err) => { console.log({ deletion_error: err }) })
    }

    async function updateButtonHandle() {
        let data = {
            id: addNewsDetails.updateId,
            title: addNewsDetails.title,
            description: addNewsDetails.desc,
            date_added: addNewsDetails.date,
            'search_tags[0]': 'ness',
            'search_tags[1]': 'iopoiop',
            publish: addNewsDetails.publish,
            featured_image: addNewsDetails.f_image,
            news_image: addNewsDetails.n_images
        }
        updateNews(data)
            .then((res) => { console.log(res) })
            .catch((err) => { console.log(err) })
    }

    function editHandle(news) {
        setSubPage(1.2)
        setAddNewsDetails({
            updateId: news._id,
            title: news.title,
            date: moment(new Date(news.date_added)).format("yyyy-MM-DDThh:mm:ss"),
            search_tags: news.search_tags,
            publish: news.publish,
            desc: news.description,
            'f-image': ["https://tsd.shtdevops.xyz/news/" + news.featured_image],
            'n-images': news.news_image.map((img) => "https://tsd.shtdevops.xyz/news/" + img)
        })

    }


    return (
        <div className='News'>
            {subPage === 1.0 && <button className='add-news' onClick={() => setSubPage(1.1)}>
                {page === "News" ? ' Add News' : page === 'Events' && ' Add Events'}
            </button>}
            {subPage === 1.0 &&
                <section className='show-news'>
                    {news && news.news_list?.map((item, i) => {
                        return (
                            <article key={i}>
                                <h4>{item.title}</h4>
                                <p>{item.date_added}  &nbsp;&nbsp;&nbsp;&nbsp; {item.search_tags?.map(e => '#' + e).join(' ')}</p>
                                <img src={"https://tsd.shtdevops.xyz/news/" + item.featured_image} alt="image" />
                                <p>{item.description}</p>
                                <div className="icons">
                                    <i onClick={() => editHandle(item)}><img src={edit_icon} alt="" /></i>
                                    <i onClick={() => handleDeletion(item._id)}><img src={delete_icon} alt="" /></i>
                                </div>
                            </article>
                        )
                    })
                    }
                    {events && events.event_list?.map((item, i) => {
                        return (
                            <article key={i}>
                                <h4>{item.title}</h4>
                                <p>{item.date_added}  &nbsp;&nbsp;&nbsp;&nbsp; {item.search_tags?.map(e => '#' + e).join(' ')}</p>
                                <img src={"https://tsd.shtdevops.xyz/events/" + item.featured_image} alt="image" />
                                {/* <p>{item.description}</p> */}
                                <div className="icons">
                                    <i onClick={() => editHandle(item)}><img src={edit_icon} alt="" /></i>
                                    <i onClick={() => handleDeletion(item._id)}><img src={delete_icon} alt="" /></i>
                                </div>
                            </article>
                        )
                    })

                    }
                </section>
            }
            {(subPage === 1.1 || subPage === 1.2) &&
                <section className='insert-news'>
                    <p className='go-back' onClick={() => (setSubPage(1.0),
                        setAddNewsDetails({
                            title: '', date: '', search_tags: '', publish: '', desc: '', 'f-image': '', 'n-images': []
                        }))}>&lt;&lt;back</p>
                    <div className='wrapper'>
                        <section className='general-form'>
                            <label htmlFor="title">
                                Title
                                <input type="text" id='title' name='title'
                                    value={addNewsDetails.title}
                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, title: e.target.value })} />
                            </label>
                            <label htmlFor="date">
                                Date
                                <input type="datetime-local" id='date' name='date'
                                    value={addNewsDetails.date}
                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, date: e.target.value })} />
                            </label>
                            <label htmlFor="tags">
                                Search tags
                                <input type="text" id='tags' name='tags'
                                    value={addNewsDetails.search_tags}
                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, search_tags: e.target.value })} />
                            </label>
                            <label htmlFor="publish">
                                publish
                                <input type="text" id='publish' name='publish'
                                    value={addNewsDetails.publish}
                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, publish: e.target.value })} />
                            </label>
                            <label htmlFor="desc">
                                Description
                                <textarea type="text" id='desc' name='desc' rows='13'
                                    value={addNewsDetails.desc}
                                    onChange={(e) => setAddNewsDetails({ ...addNewsDetails, desc: e.target.value })} />
                            </label>
                        </section>
                        <section className='images-form'>
                            <label>
                                Featured Image
                            </label>
                            <div className='images-display'>
                                {!addNewsDetails['f-image'][0] &&
                                    <label className='file-upload-button'><span>+</span>
                                        <input onChange={(e) => setAddNewsDetails({ ...addNewsDetails, 'f-image': URL.createObjectURL(e.target.files[0]) })} type="file" name='f-image' hidden />
                                    </label>
                                }
                                {addNewsDetails['f-image'][0] &&
                                    <div className='image-span'>
                                        <img src={addNewsDetails['f-image']} alt="" />
                                        <i onClick={(e) => setAddNewsDetails({ ...addNewsDetails, 'f-image': "" })}>x</i>
                                    </div>
                                }
                            </div>
                            <label >
                                New Images
                            </label>
                            <div className='images-display'>
                                {!addNewsDetails['n-images'][0] &&
                                    <label label className='file-upload-button'><span>+</span>
                                        <input onChange={(e) => setAddNewsDetails({ ...addNewsDetails, "n-images": Array.from(e.target.files).map(img => URL.createObjectURL(img)) })} type="file" name='n-images' hidden multiple />
                                    </label>
                                }
                                {addNewsDetails['n-images'][0] &&
                                    addNewsDetails['n-images'].map((image, index) => {
                                        return <div className='image-span'>
                                            <img src={image} alt="" />
                                            <i onClick={(e) => setAddNewsDetails({
                                                ...addNewsDetails, 'n-images': [...addNewsDetails['n-images'].filter((image, i) => {
                                                    return i !== index
                                                })]
                                            })}>x</i>
                                        </div>
                                    })
                                }

                            </div>
                            {
                                subPage === 1.1 ?
                                    <button onClick={() => handleSubmit()}>Add News</button> :
                                    subPage === 1.2 &&
                                    <button onClick={() => updateButtonHandle()}>Update News</button>
                            }
                        </section>
                    </div>
                </section>
            }
        </div>
    )
}
