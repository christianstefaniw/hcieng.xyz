import axios from 'axios';
import config from '../../config';

import { all_user_rooms, room_info } from '../../constants/api_constants'
import { AccountInfo } from '../../services/account'

export class MinRoomData {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class RoomData {
    constructor(id, name, messages, admin_text_only) {
        this.id = id;
        this.name = name;
        this.messages = messages;
        this.admin_text_only = admin_text_only;
    }

    static from_json(json) {
        const messages = json['messages'];
        let message_models = [];

        for (const message of messages) {
            message_models.push(Message.from_json(message))
        }

        return new RoomData(
            json['id'],
            json['name'],
            message_models,
            json['admin_text_only'],
        )
    }
}

export class Message {
    constructor(content, time, sender) {
        this.content = content;
        this.time = time;
        this.sender = sender;
    }

    static from_json(json) {
        return new Message(
            json['message'],
            json['time'],
            AccountInfo.from_json(json['sender'])
        )
    }
}

export async function all_rooms() {
    let all_min_room_data = await axios.get(all_user_rooms, { withCredentials: true })
    let rooms = [];

    for (const room_data of all_min_room_data.data) {
        rooms.push(new MinRoomData(room_data.id, room_data.name))
    }

    return rooms;
}

export async function room_data(id, bottom_bounds, update_num_msg_loaded) {
    let upper_bounds = bottom_bounds + config.MSG_LOAD_INTERVAL;
    return await axios.get(`${room_info}/${id}/${parseInt(bottom_bounds)}/${upper_bounds}`, { withCredentials: true }).then(res => {
        update_num_msg_loaded(upper_bounds)
        return RoomData.from_json(res.data)
    }).catch(function (err) {
        throw err;
    })
}