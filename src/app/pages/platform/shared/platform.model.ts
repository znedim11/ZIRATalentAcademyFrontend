import { ImageRequest } from "../../shared/image-request.model";


export class PlatformCreateRequest {
  fullName: string;
  abbriviation: string;
  outlineText: string;
  information: string;
  code: string;
  imageCreateRequest: ImageRequest;

  constructor() {
    this.fullName = null;
    this.abbriviation = null;
    this.outlineText = null;
    this.information = null;
    this.code = null;
    this.imageCreateRequest = new ImageRequest();
  }
}

export class Platform {
  fullName: string;
  abbriviation: string;
  outlineText: string;
  information: string;
  code: string;
  url: string;
  id: string;
  constructor() {
    this.fullName = null;
    this.abbriviation = null;
    this.outlineText = null;
    this.information = null;
    this.code = null;
    this.url = null;
    this.id = null;
  }
}

export class PlatformSearchRequest {
  fullName: string;
  developerIds: any[];
  publisherIds: any[];
  regionIds: any[];
  startDate: Date;
  endDate: Date[];
  constructor() {
    this.fullName = null;[]
    this.developerIds = [];
    this.publisherIds = [];
    this.regionIds = [];
    this.startDate = null;
    this.endDate = null;
  }
}