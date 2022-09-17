import { City } from './../../model/city.model';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service'
import { Weather } from 'src/app/model/weather.model';
import { debounceTime, takeUntil } from "rxjs/operators";
import { fromEvent, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchCityRef', {static: true}) searchCityRef: ElementRef;

  searchCitySub: Subscription;

  date: Date;
  weather: Weather;
  city: City

  nameCity = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.nameCity = '';
  }

  ngAfterViewInit() {
    this.searchCitySub = fromEvent(this.searchCityRef.nativeElement, 'keyup')
    .pipe(debounceTime(1500))
    .subscribe((e:any) => {
      this.nameCity = e.target.value;
      this.changeLocalization(this.nameCity);
    })
  }

  changeLocalization(newValue:any) {
    this.nameCity = newValue
    this.weatherService.getLocalization(this.nameCity).pipe(debounceTime(1000)).subscribe(
      res => {
        this.city = res
      },
      err => console.log(err)
    )
    console.log(this.nameCity)

  }

  getWeather(){
    let dateBase = this.date.toISOString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    let dateResult = dateBase.slice(0,10);


    this.weatherService.getWeather(this.city.results[0].latitude, this.city.results[0].longitude, dateResult, '2022-09-21').subscribe(
      res => {
        console.log(res);
        this.weather = res
      },
      err => console.log(err)
    )
  }

  // submitLocation(nameCity:HTMLInputElement) {

  //   let dateBase = this.date.toISOString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
  //   let dateResult = dateBase.slice(0,10);



  //   this.getWeather(this.city.results[0].latitude , this.city.results[0].longitude, dateResult);

  //   nameCity.value = '';
  //   nameCity.focus();

  //   return false
  // }

}
