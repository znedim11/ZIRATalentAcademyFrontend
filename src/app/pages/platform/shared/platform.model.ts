import { ImageCreateRequest } from '../../shared/image.model';

export class PlatformCreateRequest {
  fullName: string;
  abbriviation: string;
  outlineText: string;
  information: string;
  code: string;
  imageCreateRequest: ImageCreateRequest;

  constructor() {
    this.fullName = null;
    this.abbriviation = null;
    this.outlineText = null;
    this.information = null;
    this.code = null;
    this.imageCreateRequest = new ImageCreateRequest();
  }
}

export class Platform {
  fullName: string;
  abbriviation: string;
  outlineText: string;
  information: string;
  code: string;
  url: string;
  constructor() {
    this.fullName = null;
    this.abbriviation = null;
    this.outlineText = null;
    this.information = null;
    this.code = null;
    this.url = null;
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