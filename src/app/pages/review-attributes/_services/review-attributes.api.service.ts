import { Injectable } from "@angular/core";
import { JWTApiService } from "@savvato-software/savvato-javascript-services";
import { environment } from "../../../_environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReviewAttributesApiService {
  constructor(private _apiService: JWTApiService) {}

  getNextReviewEligiblePhrase() {
    const url = environment.apiUrl + "/api/review/";

    return new Promise((resolve, reject) => {
      this._apiService.get(url).subscribe((_data) => {
        resolve(_data);
      });
    });
  }
}
