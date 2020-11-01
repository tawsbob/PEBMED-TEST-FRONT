import axios from 'axios';
import dayjs from 'dayjs';

export const formatDate = (date)=>(dayjs(date).format('DD/MM/YYYY'))

export const restClient = (opts)=>(
    axios.create({
        baseURL: process.env.REACT_APP_API_HOST,
        ...opts
      })
)