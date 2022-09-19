export class Result {
latitude: string;
longitude: string;
name: string;
country_code: string;
}

export class City {
  generationtime_ms?: string;
  results: Result[];
}
