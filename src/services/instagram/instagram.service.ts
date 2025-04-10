import { UserInfoResponse } from "@/interface/UserInfoResponse";
import  api from "@/lib/axios/instance";

export class Instagram {
    constructor() {}

    async getUserInfo(username: string): Promise<UserInfoResponse> {
        try {
          const response = await api.post('/user/get_info', { username });
          return response.data.response.body; // <- acessa o body que contém os dados
        } catch (err) {
          console.error('Error fetching user info:', err);
          throw err;
        }
    }

    async getUserFollwers(userId: string, count: number = 10) : Promise<any> {  
        try{
            const response = await api.post('user/get_followers', {id: userId, count: count, max_id: null});
            console.log('*** sample ****');
            console.log(response.data);
            return response.data;
        } catch(err) {
            console.error('Error fetching user posts:', err);
            throw err;
        }
    }
}