import { authHeader } from '../_helpers';
import Cookies from 'js-cookie';
import {url_backend} from '../config.json';

export const userServices = {
    authenticate,
    register,
    recoverPassword
}

function register(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    return fetch(`${url_backend}/users/register`, requestOptions)
    .then(handleResponse)
    .then(data => {
        return data;
    })
}

function authenticate(data){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
     return fetch(`${url_backend}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(data => {
                Cookies.set('token', data.token)
                Cookies.set('user',data.result.firstName, { expires: 1 })
                Cookies.set('email',data.result.email, { expires: 1 })
                
                if(data.result.isAttorney){
                    Cookies.set('attorney', data.result.isAttorney)    
                }
                
                if(data.result.isSeeker){
                    Cookies.set('seeker', data.result.isSeeker)    
                }

                
            window.location.assign('/');
        });
}


function recoverPassword(email){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(email)
    };

    return fetch(`${url_backend}/users/recoverpassword`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        })
}

  function newPassword(data){
      const requestOptions = {
          method: 'POST',
          headers: authHeader(),
          body: JSON.stringify(data)
      }
  }


// function logout() {
//     Cookies.remove('token')
//     Cookies.remove('user')
//     Cookies.remove('email')
// }

// function attempts(){

//}



function handleResponse(response) {
    return response.json().then(data => {

        if (!response.ok) {
            if (response.status === 401) {
                //return window.location.reload(true);
            }
            if(response.status === 409){
                //return window.location.reload(true);
            }
            if(response.status === 400){
                console.log("Error 400")
            }
        }
        return data
    });
}
