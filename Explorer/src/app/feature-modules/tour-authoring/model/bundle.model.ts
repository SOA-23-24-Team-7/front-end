import { BundleItem } from "./bundle-item.model";

export interface Bundle {
    id?: number;
    name: string;
    price: number;
    bundleItems: BundleItem[]
}