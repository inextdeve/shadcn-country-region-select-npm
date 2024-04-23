import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  //@ts-ignore
} from "@components/ui/select";
import { filterCountries } from "../../lib/helpers";
import { CountryRegion } from "../../types/country-region";
//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";

interface CountrySelectProps {
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  onChange?: (value: string) => void;
  classname?: string;
  placeholder?: string;
}

function CountrySelect({
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  classname,
  placeholder = "Country",
}: CountrySelectProps) {
  const [countries, setCountries] = useState<CountryRegion[]>([]);

  useEffect(() => {
    setCountries(
      filterCountries(countryRegionData, priorityOptions, whitelist, blacklist)
    );
  }, []);

  return (
    <Select
      onValueChange={(value: string) => {
        onChange(value);
      }}
    >
      <SelectTrigger className={classname}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {countries.map(({ countryName, countryShortCode }) => (
          <SelectItem key={countryShortCode} value={countryShortCode}>
            {countryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CountrySelect;
