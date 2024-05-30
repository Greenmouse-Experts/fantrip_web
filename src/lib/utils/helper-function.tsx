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

  export const convertDaysToMilliSeconds = (days:number) => {
    if(!days){return 0}
    const milliseconds = days * 24 * 60 * 60 * 1000;
    return milliseconds
  };