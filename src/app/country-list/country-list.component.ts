import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpDataService } from '../http-data.service';
import { SearchObject } from '../type-interface/search-object'
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  private _searchByArray = ['region', 'lang', 'currency'];//what options for search are avaiable.
  public search: SearchObject = { searchBy: '', searchValue: '', fields: ['alpha3Code', 'name', 'languages', 'currencies', 'timezones', 'flag', 'region', 'subregion', 'capital'] };
  public countries;
  public dataReady: boolean = false;
  public filterType: string = '';
  public filterValue: string = '';
  public filterArray = [{ name: 'Region', keyword: 'region' }, { name: 'Name', keyword: 'name' }, { name: "Language", keyword: 'lang' }, { name: "Currency", keyword: "currency" }];
  public showForm:boolean=false;

  constructor(private _router: Router, private _route: ActivatedRoute, private _http: HttpDataService, private _location: Location) {
    this._router.routeReuseStrategy.shouldReuseRoute = (): boolean => {
      return false;
    };
  }

  ngOnInit() {
    this.search.searchBy = this._route.snapshot.paramMap.get('searchBy');

    //if this is an unsupported searchBy options then show 404
    if (!this._searchByArray.includes(this.search.searchBy)) {
      this._router.navigate(['/not-found']);
    }

    this.search.searchValue = this._route.snapshot.paramMap.get('value');
    this.filterType = this.search.searchBy;
    this.filterValue = this.search.searchValue;

    if (this.search) {
      console.log(this.search);
      this.getData();
    }
  }


  getData() {
    this.dataReady = false;
    this.countries = [];
    this._http.getCountries(this.search).subscribe((resp) => {
      if (!resp['status']) {
        //api returns status and message only incase of no data. So we set countries data to blank array
        this.countries = resp;
      }

      this.dataReady = true;

    },
      (err) => {
        // incase of error log the search object that caused the error for debugging.
        console.log('failed to get data for ', this.search);
        console.log(err);
        this.dataReady = true;
      }
    )
  }

  back() {
    this._location.back();
  }

  submit() {
    console.log(this.filterValue + " " + this.filterType);

    if (this.filterType != '' && this.filterValue != '') {
      this.search.searchBy = this.filterType;
      this.search.searchValue = this.filterValue;

      this.getData();
    }

  }

  toggleFilter(){
    this.showForm = !this.showForm;
  }



}
