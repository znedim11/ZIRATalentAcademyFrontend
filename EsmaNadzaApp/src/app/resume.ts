export interface IResume {
  highSchool: IHighSchool;
  university: IUniversity;
  work: IWork[];
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
  hobbiesInterests: IHobbiesInterests[];
  myDescription: string;
}

export interface IHighSchool {
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
}

export interface IUniversity {
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
}

export interface IWork {
  name: string;
  jobPosition: string;
  shortDescription: string;
  description: string;
  images: string[];
}

export interface IHobbiesInterests {
  name: string;
  description: string;
  images: string[];
}
