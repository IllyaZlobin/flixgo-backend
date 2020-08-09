import { IBaseModel } from "./base.model";

export interface ICountry extends IBaseModel {
  name: string;
  region: string;      
}