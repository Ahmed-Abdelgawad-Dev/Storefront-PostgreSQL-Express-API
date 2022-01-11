export type User = {
    id?: number;
    user_name: string,
    first_name: string;
    last_name: string;
    password: string;
}


export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export type orderDetails = {
    id?: number;
    prodId: number;
    quantity: number;
    ordId: number;
}

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}