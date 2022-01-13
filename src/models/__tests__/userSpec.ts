import {UserModel} from "../user";


const userInstance = new UserModel()

describe('User Instance', () => {
    describe('Testing user instance methods', () => {
        it('Index method defined', function () {
            expect(userInstance.index).toBeDefined()
        });
    })

})