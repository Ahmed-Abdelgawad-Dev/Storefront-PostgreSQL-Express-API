import client from '../../database'
import {UserModel} from "../../models/user";
import supertest from "supertest";
import {app} from '../../server'
import {User} from '../../types'

const usrModel = new UserModel()

describe('Testing API ENDPOINTS ',()=> {

    describe('API ENDPOINTS Existence', () => {
        it('Create method defined in controllers',  () =>{
          expect(usrModel.create).toBeDefined();
        });
        it('Index method defined in controllers',  ()=> {
          expect(usrModel.index).toBeDefined();
        });
        it('Show method defined in controllers',  () => {
          expect(usrModel.show).toBeDefined();
        });
        it('Update method defined in controllers', ()=> {
          expect(usrModel.update).toBeDefined();
        });
        it('Destroy method defined in controllers', ()=> {
          expect(usrModel.destroy).toBeDefined();
        });
        it('Authenticate method defined in controllers', ()=> {
          expect(usrModel.authenticate).toBeDefined();
        });
    });

})