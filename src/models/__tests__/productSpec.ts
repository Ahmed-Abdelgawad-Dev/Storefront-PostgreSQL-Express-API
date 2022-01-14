import { ProductModel } from '../product';
import { Product } from '../../types';
import client from '../../database';
import dotenv from 'dotenv';
import _ from 'lodash';
import bcrypt from 'bcrypt';

dotenv.config();
const { SALT_ROUNDS, PEPPER } = process.env;

const productModel = new ProductModel();

// Products dummy list
const prodList: Product[] = [
  { name: 'prod1', price: 100, category: 'category' },
  { name: 'prod2', price: 102, category: 'category2' },
  { name: 'prod3', price: 103, category: 'category3' }
];

const listWithId = prodList.map((p, index) => {
  p.id = index + 1;
  return p;
});

describe('Product Instance', () => {
  describe('Testing product instance methods existence:', () => {
    it('Index method defined', function () {
      expect(productModel.index).toBeDefined();
    });
    it('CreateProduct method defined', function () {
      expect(productModel.createProduct).toBeDefined();
    });
    it('Show method defined', function () {
      expect(productModel.show).toBeDefined();
    });
  });
  describe('Test Model methods logic', async () => {
    beforeAll(async () => {
      const connection = await client.connect();
      for (const prod of prodList) {
        await connection.query(
          'insert into products (name, price, category) values ($1, $2, $3);',
          [prod.name, prod.price, prod.category]
        );
      }
      connection.release();
    });

    it('Index: retrieved list of all products', async () => {
          const l = await productModel.index()
          expect(l).toEqual(listWithId)
    });

    it('productCreate: created product', async () => {
      const item = await productModel.createProduct({
        name: 'prod1',
        price: 100,
        category: 'category'
      })
      expect(item).toEqual({
        id: 4,
        name: 'prod1',
        price: 100,
        category: 'category'
      })
    });

    it('Show:  returns a specific product by an ID', async () => {
      const result = await productModel.show(4);

    expect(result).toEqual({
      id: 4,
      name: 'prod1',
      price: 100,
      category: 'category',
    });
  });

    afterAll(async () => {
      const conn = await client.connect();
      await conn.query('delete from products;\n; alter sequence products_id_seq restart with 1;\n');
      conn.release();
  });
  });
});
