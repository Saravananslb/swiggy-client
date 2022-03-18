import Cookies from 'universal-cookie';
import axios from 'axios';

export const cookie = new Cookies();
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(user) => {
    return await axios.post('/auth/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const signInUser = async(user) => {
    return await axios.post('/auth/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const validateUser = async() => {
    return await axios.get(`/auth/validate`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const bookBusTicket = async(body) => {
    return await axios.post(`/bus/create`, body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const getLocations = async(loc) => {
    return await axios.get(`/food/location?search=${loc}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getRestaurants = async(restaurant) => {
    return await axios.get(`/food/restaurants?${restaurant}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getCartItem = async() => {
    return await axios.get(`/food/cart`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const addToCart = async(foods) => {
    return await axios.post(`/food/cart`, foods, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const checkout = async(id) => {
    return await axios.put(`/food/checkout`, {id: id}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}
