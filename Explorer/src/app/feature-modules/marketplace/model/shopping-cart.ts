import { BundleOrderItem } from "./bundle-order-item.model";
import { OrderItem } from "./order-item";
import { TourLimitedView } from "./tour-limited-view.model";

export interface ShoppingCart {
    id?: number;
    touristId?: number;
    totalPrice?: number;
    isPurchased?: boolean;
    orderItems?: OrderItem[];
    bundleOrderItems?: BundleOrderItem[];
}
