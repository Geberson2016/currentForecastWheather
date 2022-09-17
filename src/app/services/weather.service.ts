import { City } from './../model/city.model';
import { Weather } from './../model/weather.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  foreCast: string = '';
  geocoding: string = '';


  constructor(private http: HttpClient) {
    this.foreCast = `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo`
    this.geocoding = `https://geocoding-api.open-meteo.com/v1/search?`
   }

   getWeather(latitude:string, logitude:string, dateSelected:string){
    return this.http.get<Weather>(`${this.foreCast}&latitude=${latitude}&longitude=${logitude}&start_date=${dateSelected}&end_date=${dateSelected}`)
   }

   getLocalation(city:string){
    return this.http.get<City>(`${this.geocoding}&name=${city}`)

   }
}
