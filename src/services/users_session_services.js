export class UserSession {


    static setToken(token) {
        // localStorage.setItem( "iat",iat);
        // localStorage.setItem( "expire",expire);
        localStorage.setItem("token", token);


    }

    static destroyToken() {
        // localStorage.setItem( "iat",iat);
        // localStorage.setItem( "expire",expire);
        localStorage.removeItem("token");
    }

    static getUserToken() {
        return localStorage.getItem("token");
    }

    static isAuth() {
        return this.getUserToken() !==null;
    }


}


//{
//     "_id": "5cc429961c3f8211e0e1277f",
//     "email": "melamin100@yahoo.com",
//     "password": "$2a$10$urFN7MmWoQTpVdf1uMIdL.fp.3wver62.5et.KUEjHjETQh/hgj5K",
//     "name": "asdsad",
//     "profile": {
//         "_id": "5cc429961c3f8211e0e12780",
//         "about": "mohammed elamin developer sfsdf",
//         "phone_number": "090264996623",
//         "job": "asdasdasdvv",
//         "profile_image_path": "https://young-tor-63067.herokuapp.com/api/users/profile_image/app_books_provider_1556364638571.jpg"
//     },
//     "updatedAt": "2019-04-27T11:44:04.239Z",
//     "createdAt": "2019-04-27T10:06:16.059Z",
//     "__v": 0,
//     "password_reset_token": "HrVdxMkgEqjss5l9"
// }