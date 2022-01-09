import {Order, orderDetails, User} from '../../types'

export const formatUser = (id: number, user_name: string, first_name: string, last_name: string, password: string): User => {
    return {
        id: id, user_name: user_name, first_name: first_name,
        last_name: last_name, password: password
    }
}

export const formatOrderDetails = (id: number, prodId: number, quantity: number, ordId: number): orderDetails => {
    return {id, prodId, quantity, ordId}
}

export const formatOrder = (id: number, status: string, user_id: number): Order => {
    return {
        id: id, status: status, userId: user_id
    }
}
