import { TestBed } from "@angular/core/testing";

import { OneuserService } from "./oneuser.service";

describe("OneuserService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OneuserService = TestBed.get(OneuserService);
    expect(service).toBeTruthy();
  });
});
