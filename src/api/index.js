import axios from "axios";

const API = axios.create({ baseURL: 'https://tsd.shtdevops.xyz/admin' })

let headers = {
    'Content-Type': 'multipart/form-data'
}

// News endpoints
export const deleteNews = async (id) => API.post('/testDeleteNews', { "del_id": id })
export const insertNews = async (data) => API.post('/testInsertNews', headers, data)
export const updateNews = async (data) => API.post('/testUpdateNews', data)
export const getAllNews = async (data) => API.post('/testGetNews', data)
export const getNewsDetail = async (id) => API.get('/testGetNewsDetail/' + id)

// Events endpoints
export const insertEvent = async (data) => API.post('/testInsertEvent', data)
export const deleteEvent = async (id) => API.post('/testDeleteEvent', { "del_id": id })
export const getAllEvents = async (data) => API.post('/testGetEvents', { "page": 0 })
export const getEventDetail = async (id) => API.post('/testGetEventDetail/' + id)
export const updateEvent = async (data) => API.post('/testUpdateEvent', data)