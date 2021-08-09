import axios from 'axios';
import { initSettings, settings } from '../../settings';

initSettings();
const hciEngAxios = axios.create({
    baseURL: settings.SERVER_ORIGIN,
    headers: {'Authorization': process.env.REACT_APP_HCI_ENG_API_TKN
    }
})

export default hciEngAxios;