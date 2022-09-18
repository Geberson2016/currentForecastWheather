import { City } from './../model/city.model';
import { Weather } from './../model/weather.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AirQuality } from '../model/air.model';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  foreCast: string = '';
  geocoding: string = '';
  airQuality: string = '';


  constructor(private http: HttpClient) {
    this.foreCast = `https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo`

    this.geocoding = `https://geocoding-api.open-meteo.com/v1/search?`

    this.airQuality = `https://air-quality-api.open-meteo.com/v1/air-quality?&hourly=carbon_monoxide,dust`
   }

   getWeather(latitude:string, logitude:string, startDate:string, endDate:string){
    return this.http.get<Weather>(`${this.foreCast}&latitude=${latitude}&longitude=${logitude}&start_date=${startDate}&end_date=${endDate}`)
   }

   getLocalization(city:string){
    return this.http.get<City>(`${this.geocoding}&name=${city}`)

   }

   getAirQuality(latitude:string, logitude:string, startDate:string, endDate:string){
    return this.http.get<AirQuality>(`${this.airQuality}&latitude=${latitude}&longitude=${logitude}&start_date=${startDate}&end_date=${endDate}`)
   }
}
