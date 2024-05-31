export interface FetchStayParamItem{
        property: string
        name: string
        state: string
        guests: number
        city: string
        checkIn: string
        checkOut: string
}
export interface UtilsStoreItem{
    fetchStay: FetchStayParamItem
    guestReserveTab: number,
    guestBookTab: number,
}