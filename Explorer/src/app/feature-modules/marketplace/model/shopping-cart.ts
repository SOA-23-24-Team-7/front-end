import { OrderItem } from "./order-item";
import { TourLimitedView } from "./tour-limited-view.model";

export interface ShoppingCart {
    id?: number;
    touristId?: number;
    totalPrice?: number;
    isPurchased?: boolean;
    orderItems?: OrderItem[];
}
