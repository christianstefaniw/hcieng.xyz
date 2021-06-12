import axios from 'axios';

import { login_endpoint } from '../../../constants/api_constants'

async function login(jwt) {
    let k = await axios.post(login_endpoint, {'jwt': jwt});
}

export default login