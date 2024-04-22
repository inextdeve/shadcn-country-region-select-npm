import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  //@ts-ignore
} from "@/ui/select";
import { filterCountries, filterRegions } from "../../lib/helpers";
import { CountryRegion, Region } from "../../types/country-region";
//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";

interface RegionSelectProps {
  countryCode: string;
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  onChange?: (value: string) => void;
  classname?: string;
  placeholder?: string;
}

function RegionSelect({
  countryCode,
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  classname,
  placeholder = "Region",
}: RegionSelectProps) {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const regions = countryRegionData.find(
      (country: CountryRegion) => country.countryShortCode === countryCode
    );

    if (regions) {
      setRegions(
        filterRegions(regions.regions, priorityOptions, whitelist, blacklist)
      );
    }
  }, [countryCode]);

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
        {regions.map(({ name, shortCode }) => (
          <SelectItem key={shortCode} value={shortCode}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default RegionSelect;
