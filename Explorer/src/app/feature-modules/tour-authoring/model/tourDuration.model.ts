export interface TourDuration{
  duration: number,
  transportType: TransportType
}

export enum TransportType{
  Walking = 0,
  Bicycle = 1,
  Car = 2,
}