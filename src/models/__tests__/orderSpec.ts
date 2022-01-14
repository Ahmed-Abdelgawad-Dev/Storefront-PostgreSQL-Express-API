import client from '../../database'
import {UserModel} from "../user";
import {OrderModel} from "../order";

const userModel = new UserModel()
const orderModel = new OrderModel()

describe('Order Model Instance', () => {
  it('Testing Order instance methods existence:', () => {
    expect(orderModel.createOrder).toBeDefined();
  });
  it('Index: existed', () => {
    expect(orderModel.index).toBeDefined();
  });
  it('Show: existed', () => {
    expect(orderModel.show).toBeDefined();
  });
  it('Update: existed', () => {
    expect(orderModel.update).toBeDefined();
  });
  it('Delete: existed', () => {
    expect(orderModel.destroy).toBeDefined();
  });
  it('Order BY User ID: existed', () => {
    expect(orderModel.ordByUsrId).toBeDefined();
  });
});