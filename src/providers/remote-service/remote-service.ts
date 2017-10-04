import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getApiUrl : string = "http://localhost:3000/";

  getFiles() {
    return this.http.get(this.getApiUrl)
                    .map((res : Response ) => res.json())
  }

}
