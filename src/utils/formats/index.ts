import {User} from '../../types'

export const formatUser = (id: number, user_name: string, first_name: string, last_name: string, password: string): User => {
    return {
        id: id, user_name: user_name, first_name: first_name,
        last_name: last_name, password: password
    }
}