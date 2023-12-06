import { BundleItem } from "./bundle-item.model";

export interface Bundle {
    id?: number;
    name: string;
    price: number;
    status: BundleStatus;
    bundleItems: BundleItem[]
}

export enum BundleStatus {
    Draft = 0,
    Published = 1,
    Archived = 2,
    Deleted = 3
}