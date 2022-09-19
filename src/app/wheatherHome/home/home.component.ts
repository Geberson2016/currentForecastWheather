import { AirQuality } from './../../model/air.model';
import { City } from './../../model/city.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from 'src/app/model/weather.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { fromEvent, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('searchCityRef', { static: true }) searchCityRef: ElementRef;

  searchCitySub: Subscription;

  date: Date;
  weather: Weather;
  city: City;
  airQuality: AirQuality;

  searchNameCity = '';
  nameCity = '';
  countryCode = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.searchNameCity = '';
  }

  ngAfterViewInit() {
    this.searchCitySub = fromEvent(this.searchCityRef.nativeElement, 'keyup')
      .pipe(debounceTime(700))
      .subscribe((e: any) => {
        this.searchNameCity = e.target.value;
        this.changeLocalization(this.searchNameCity);
      });
  }

  changeLocalization(newValue: any) {
    this.searchNameCity = newValue;
    this.weatherService
      .getLocalization(this.searchNameCity)
      .pipe(debounceTime(1000))
      .subscribe(
        (res) => {
          this.city = res;
        },
        (err) => alert('Erro na API')
      );
  }

  getForecastWheather() {
    if (this.date == undefined) {
      alert('Data não selecionada. Tente novamente');
    }
    if (this.city == undefined) {
      alert('Cidade não inserida. Tente novamente');
    }

    let endDateBase = new Date(this.date);
    endDateBase.setDate(endDateBase.getDate() + 4);

    let startDate = this.date
      .toISOString()
      .replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
      .slice(0, 10);
    let endDate = endDateBase
      .toISOString()
      .replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
      .slice(0, 10);

    this.weatherService
      .getWeather(
        this.city.results[0].latitude,
        this.city.results[0].longitude,
        startDate,
        endDate
      )
      .subscribe(
        (res) => {
          this.weather = res;
        },
        (err) => alert('Erro na API. Previsão de 7 dias em todo o mundo')
      );
      this.nameCity = this.city.results[0].name;
      this.countryCode = this.city.results[0].country_code;

    //API ESTA COM ALGUMA COISA QUE NÃO DEIXA EU OBTER RETORNO DE DATAS PASSADAS, TEM UM LIMITE DE DIA MINIMO
    // this.weatherService
    //   .getAirQuality(
    //     this.city.results[0].latitude,
    //     this.city.results[0].longitude,
    //     startDate,
    //     endDate
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.airQuality = res;
    //     },
    //     (err) => console.log(err)
    //   );
  }
}
