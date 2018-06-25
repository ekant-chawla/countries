import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SearchObject} from './type-interface/search-object'

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  private _baseUrl = 'https://restcountries.eu/rest/v2/';
  constructor(private _client:HttpClient) { }

  getCountries(search:SearchObject){
    if(search.searchBy=='region' && search.searchValue=='all'){
      return this._client.get(`${this._baseUrl}all?fields=${search.fields.join(';')}`);
    }else{
      return this._client.get(`${this._baseUrl}${search.searchBy}/${search.searchValue}?fields=${search.fields.join(';')}`);
    }
  }

}
