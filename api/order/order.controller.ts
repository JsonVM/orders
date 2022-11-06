import { Order } from "./order.interface";
import { orders } from "../database/orders";

export const createOrder = async (order: Order): Promise<any> => {
    orders.push(order);
    return {ok:true, orders};
} 