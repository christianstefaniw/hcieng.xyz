import axios from 'axios';

import { all_user_rooms } from '../../constants/api_constants'
import { AccountInfo } from '../../services/account'

export class RoomData {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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
       rooms.push(new RoomData(room_data.id, room_data.name))
   }

   return rooms;
}