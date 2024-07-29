import { FetchStayParamItem } from "../contracts/utils";

interface AddressType {
  long_name: string;
  short_name: string;
  types: string[];
}
export const getStateFromGoogle = (address: AddressType[]) => {
  const selectedAdd = address.filter((where) =>
    where.types.includes("administrative_area_level_1")
  );
  const state = selectedAdd[0].long_name;
  return state;
};

export const getCountryFromGoogle = (address: AddressType[]) => {
  const selectedAdd = address.filter((where) =>
    where.types.includes("country")
  );
  const state = selectedAdd[0].long_name;
  return state;
};

export const convertDaysToMilliSeconds = (days: number) => {
  if (!days) {
    return 0;
  }
  const milliseconds = days * 24 * 60 * 60 * 1000;
  return milliseconds;
};

export const objectToQueryString = (obj: FetchStayParamItem) => {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map((key) => {
    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(obj[key as keyof typeof obj])
    );
  });
  return keyValuePairs.join("&");
};

export const getFutureDate = (startDate: Date, future:number): Date => {
  const currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + future);
  return currentDate;
}

export const returnNumberOnly = (value:string) => {
  const newValue = value.replace(/\D/g, "")
  return newValue
}
