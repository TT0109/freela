import { UserInfoResponse } from "@/interface/UserInfoResponse";
import  api from "@/lib/axios/instance";

export class Instagram {
    constructor() {}

    async getUserInfo(username: string) : Promise<UserInfoResponse> {
        try{
            const response = await api.get('/user/details?username=' + username);
            return response.data;
        } catch(err) {
            console.error('Error fetching user info:', err);
            throw err;
        }
    }

    async getUserPosts(userId: string) : Promise<any> {  
        try{
            const response = await api.get('/user/followers?user_id=' + userId);
            return response.data;
        } catch(err) {
            console.error('Error fetching user posts:', err);
            throw err;
        }
    }
}