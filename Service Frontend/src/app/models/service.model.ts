// service.model.ts
export interface CarService {
  id?: number;
  name: string;
  description: string;
  price: number;
}


export interface ServicePackage {
carServices: any;
  id?: number;
  name: string;
  description: string;
  totalPrice: number;
  duration: number;
  services: CarService[];
} 