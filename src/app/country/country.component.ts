import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpDataService } from '../http-data.service';
import { SearchObject } from '../type-interface/search-object'
import { Location } from '@angular/common';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  private search: SearchObject = { searchBy: 'alpha', searchValue: '', fields: [] };
  public country;
  public dataReady: boolean = false;

  constructor(private _router: Router, private _route: ActivatedRoute, private _location: Location, private _http: HttpDataService) { }

  ngOnInit() {
    this.search.searchValue = this._route.snapshot.paramMap.get('code');

    if (this.search) {
      console.log(this.search);
      this.getData();
    }
  }


  getData() {
    this.dataReady = false;

    this._http.getCountries(this.search).subscribe((resp) => {
      if (resp['status']) {
        //api returns status and message only incase of no data. So we set countries data to blank array
        this.country = undefined;
      } else {
        this.country = resp;
        console.log(this.country);
        this.getNeighbours();
      }
      this.dataReady = true;

    },
      (err) => {
        // incase of error log the search object that caused the error for debugging.
        console.log('failed to get data for ', this.search);
        console.log(err);
        this.dataReady = true;
      }
    );
  }

  //uses the code of border countries to get their names
  getNeighbours() {
    if (this.country.borders.length > 0) {
      this.country.neighbours = []
      let search: SearchObject = { searchBy: 'alpha', searchValue: '', fields: ['name'] };
      for (let country of this.country.borders) {
        search.searchValue = country;
        this._http.getCountries(search).subscribe((resp) => {
          if (resp["name"] && resp['name'] != '') this.country.neighbours.push(resp['name']);
        }, (err) => {
          console.log('failed to get neightbour');
        });

      }
    }
  }


  back() {
    this._location.back();
  }


}
