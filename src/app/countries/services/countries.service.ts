import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Capital } from '../interfaces/capital';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiURL: string="https://restcountries.com/v3.1";

  public cacheStore: CacheStore={
    byCapital:  {term:'', countries:[]},
    byCountries:{term:'', countries:[]},
    byRegion:   {region:'', countries:[]},
  }


  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

private saveLocalStorage(){
  localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore) )
}

private loadFromLocalStorage(){
if(!localStorage.getItem('cacheStore'))return;

this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);
}



private getCountriesRequest(url:string):Observable<Capital[]>{
return this.http.get<Capital[]>(url)
.pipe(
  catchError(()=>of([]) ),
  // delay(2000)
);}


searchContryByAlphaCode(code:string):Observable<Capital | null>{
  const url =`${this.apiURL}/alpha/${code}`;
  return this.http.get<Capital[]>(url).pipe(
    map(  countries=>countries.length>0?countries[0]:null),
   catchError(()=>of(null))
  );

}

  searchCapital(term:string):Observable<Capital[]>{
    const url =`${this.apiURL}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=>this.cacheStore.byCapital={term, countries}),
    tap(()=>this.saveLocalStorage())
    )

  }

   searchCountry(term:string):Observable<Capital[]>{
  const url =`${this.apiURL}/name/${term}`;
 return this.getCountriesRequest(url).pipe(
  tap(countries=>this.cacheStore.byCountries={term, countries}),
  tap(()=>this.saveLocalStorage())
)
  }

  searchRegion(region:Region):Observable<Capital[]>{
    const url =`${this.apiURL}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap(countries=>this.cacheStore.byRegion={region, countries}),
      tap(()=>this.saveLocalStorage())
    )
    }



}
