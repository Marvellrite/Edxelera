import { FetchQueryOptions} from "@tanstack/react-query";
import { userAPI } from "./api";

export const UserFetchOptions = {
    getUserDetails: (userId:string): FetchQueryOptions =>({
        queryFn: ()=>userAPI.getUser(userId),
        queryKey: ['user', userId]

    } )
}

export default UserFetchOptions