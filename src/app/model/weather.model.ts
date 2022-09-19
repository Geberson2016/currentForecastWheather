export class Dailys {
  temperature_2m_max: string[];
  temperature_2m_min: string[];
  time: string[];
}
export class Weather{
  elevation:string;
  daily: Dailys;
}
