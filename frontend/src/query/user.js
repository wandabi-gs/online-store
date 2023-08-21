import Cookies from 'js-cookies'

export const is_authenicated = () =>{
    return Cookies.hasItem('session_token')
}