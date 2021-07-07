import {ImageRequest} from "../../shared/image-request.model";
export class CompanyCreateRequest {
  name: string;
  country: string;
  city: string;
  address: string;
  website: string;
  telNumber: string;
  email: string;
  startDate: string;
  endDate: string;
  outlineText: string;
  information: string;
  imageCreateRequest: ImageRequest
  imageUrl: string;
  
  constructor() {
    this.name= null;
    this.country= null;
    this.city= null;
    this.address= null;
    this.website= null;
    this.telNumber= null;
    this.email= null;
    this.startDate= null;
    this.endDate= null;
    this.outlineText= null;
    this.information= null;
    this.imageCreateRequest= new ImageRequest();
  }
}