// import client from "../database";
// import {Order} from "../types";
// import {formatOrder} from "../utils/formats";
//
//
// export class OrderModel {
//     async create(usrId: number): Promise<Order[]> {
//         try {
//             const connection = await client.connect()
//             const userActiveOrder = await connection.query(
//                 "select id from orders where status = 'active' and user_id = ($1);",
//                 [usrId]
//             )
//             const result = userActiveOrder.rows[0]
//             if (result) {
//                 connection.release()
//                 throw new Error(`Active order already existed`)
//             } else {
//                 const result2 = await connection.query(
//                     'insert into orders (status,user_id) values ($1, $2) returning *;',
//                     ['active', usrId]
//                 )
//                 const {id, status, user_id} = result2.rows[0]
//                 connection.release()
//                 return formatOrder(id, status, Number(user_id))
//             }
//         } catch (e) {
//             // @ts-ignore
//             throw new Error(`Failed when creating an order: ${e.message}`)
//         }
//     }
//     async index(): Promise<Order[]> {
//         try {
//             const connection = await client.connect()
//             const result =
//                 await connection
//                         .query(
//                             "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, ,'price', p.price, 'category', p.category, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_details AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status;")
//             connection.release()
//             return result.rows.map((ord) => formatOrder(ord.id, ord.status, ord.userId))
//         } catch (e) {
//             // @ts-ignore
//             throw new Error(`Failed when creating an order: ${e.message}`)
//         }
//     }
// }