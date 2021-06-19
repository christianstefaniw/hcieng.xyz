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

export const LoadingStatusEnum = {
    "websocket_loaded": 1, "rooms_loaded": 2, "messages_loaded": 3,
    "ws_and_rooms_loaded": 4, "ws_and_messages_loaded": 5,
    "rooms_and_messages_loaded": 6, "loaded": 7, "none_loaded": 8
};
Object.freeze(LoadingStatusEnum)


export class LoadingHelpers {
    static check_rooms_loaded(loading_state) {
        return loading_state === LoadingStatusEnum.rooms_loaded ||
            loading_state === LoadingStatusEnum.ws_and_rooms_loaded ||
            loading_state === LoadingStatusEnum.rooms_and_messages_loaded ||
            loading_state === LoadingStatusEnum.loaded
    }

    static check_ws_loaded(loading_state) {
        return loading_state === LoadingStatusEnum.ws_loaded ||
            loading_state === LoadingStatusEnum.ws_and_rooms_loaded ||
            loading_state === LoadingStatusEnum.ws_and_rooms_loaded.ws_and_messages_loaded ||
            loading_state === LoadingStatusEnum.loaded
    }

    static messages_loaded(loading_state) {
        switch (loading_state) {
            case LoadingStatusEnum.websocket_loaded:
                return LoadingStatusEnum.ws_and_messages_loaded;
            case LoadingStatusEnum.rooms_loaded:
                return LoadingStatusEnum.rooms_and_messages_loaded;
            case LoadingStatusEnum.loaded:
                return LoadingStatusEnum.loaded;
            case LoadingStatusEnum.none_loaded:
                return LoadingStatusEnum.messages_loaded;
            default:
                return loading_state;
        }
    }

    static ws_loaded(loading_state) {
        switch (loading_state) {
            case LoadingStatusEnum.rooms_loaded:
                return LoadingStatusEnum.ws_and_rooms_loaded;
            case LoadingStatusEnum.messages_loaded:
                return LoadingStatusEnum.ws_and_messages_loaded;
            case LoadingStatusEnum.rooms_and_messages_loaded:
                return LoadingStatusEnum.loaded;
            case LoadingStatusEnum.none_loaded:
                return LoadingStatusEnum.ws_loaded;
            default:
                return loading_state
        }
    }

    static rooms_loaded(loading_state) {
        switch (loading_state) {
            case LoadingStatusEnum.ws_loaded:
                return LoadingStatusEnum.ws_and_rooms_loaded;
            case LoadingStatusEnum.messages_loaded:
                return LoadingStatusEnum.ws_and_messages_loaded;
            case LoadingStatusEnum.ws_and_messages_loaded:
                return LoadingStatusEnum.loaded;
            case LoadingStatusEnum.none_loaded:
                return LoadingStatusEnum.rooms_loaded;
            default:
                return loading_state
        }
    }

    static unload_ws_and_messages() {
        return LoadingStatusEnum.rooms_loaded;
    }

    static fully_loaded(loading_state) {
        return loading_state === LoadingStatusEnum.loaded;
    }
}

