import { Capital } from "./capital";
import { Region } from "./region.type";

export interface CacheStore{
byCapital:TermCountries;
byCountries:TermCountries;
byRegion:RegionCountries;
}
export interface TermCountries{
  term:string;
  countries:Capital[];
}

export interface RegionCountries{
  region: Region;
  countries: Capital[];
}
