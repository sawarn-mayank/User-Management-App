import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:5000/users";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(id){
        return axios.get(USER_API_BASE_URL + '/' + id);
    }

    updateUser(user, id){
        return axios.put(USER_API_BASE_URL + '/' + id, user);
    }

    deleteUser(id){
        return axios.delete(USER_API_BASE_URL + '/' + id);
    }
}

export default new UserService()