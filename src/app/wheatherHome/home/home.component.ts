import { City } from './../../model/city.model';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service'
import { Weather } from 'src/app/model/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date: Date;
  weather: Weather;
  nameCity: City

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

  }

  getWeather(latitude:string, longitude:string, dateSelected:string){
    this.weatherService.getWeather(latitude, longitude, dateSelected).subscribe(
      res => {
        console.log(res);
        this.weather = res
      },
      err => console.log(err)
    )
  }

  getLocalition(city:string){
    this.weatherService.getLocalation(city).subscribe(
      res => {
        console.log(res );
        this.nameCity = res
      },
      err => console.log(err)
    )
  }

  submitLocation(city:HTMLInputElement) {
    this.getLocalition(city.value);
    let dateBase = this.date.toISOString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    let dateResult = dateBase.slice(0,10);



    this.getWeather(this.nameCity.results[0].latitude , this.nameCity.results[0].longitude, dateResult);

    city.value = '';
    city.focus();

    return false
  }

}
