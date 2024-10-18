import { Component, Input } from '@angular/core';
import { Capital } from '../../interfaces/capital';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img{
      width: 35px;
      height: 25px;
    }`
  ]
})
export class CountryTableComponent {

  @Input()
  public countries:Capital[]=[];
}
