import { getImageBase64 } from "@/app/actions/imageProxyActions";
import { UserInfoResponse } from "@/interface/UserInfoResponse";
import  api from "@/lib/axios/instance";
import { get } from "http";

export class Instagram {
    constructor() { }

    async getUserInfo(username: string): Promise<UserInfoResponse> {
        try {
          const response = await api.post('/user/get_info', { username });
          return response.data.response.body;
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

    async onBlurFollowersFotos(userId: string, count: number = 10): Promise<any> {
        try {
          const data = await this.getUserFollwers(userId, count);
          
          const followers = await Promise.all(
            data.response.body.users.map((follower: any) => 
              getImageBase64(follower.profile_pic_url, true)
            )
          );
      
          return followers;
        } catch (err) {
          console.error('Error fetching user posts:', err);
          throw err;
        }
      }
}