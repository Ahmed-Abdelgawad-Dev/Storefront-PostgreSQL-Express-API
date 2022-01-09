export type User = {
    id?: number;
    user_name: string,
    first_name: string;
    last_name: string;
    password: string;
}


export type Order = {
  id?: number;
  userId: number;
  status: string;
};

export type orderDetails = {
    id?: number;
    prodId: number;
    quantity: number;
    ordId: number;
}