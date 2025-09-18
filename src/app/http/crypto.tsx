import axios from "axios";

/** ---------------------------------------------------
 *  Get Cryptocurrency
 *  ---------------------------------------------------
 */
export function getCryptocurrency(): Promise<CryptocurrencyInterface>{
    let responseData: CryptocurrencyInterface = {} as CryptocurrencyInterface;

    return axios.request({
        method: "GET",
        url: `/api/coins?start=1&perPage=100`
    }).then((response) => {
        let responseData: CryptocurrencyInterface = response.data;
        if(responseData?.data?.cryptoCurrencyList !== undefined){
            return responseData;
        }

        return responseData;
    }).catch((error) => {
        return responseData;
    });
}


export interface CryptocurrencyInterface {
    data: Data
    status: Status
}
  
interface Status {
    timestamp: string
    error_code: string
    error_message: string
    elapsed: string
    credit_count: number
}
  
interface Data {
    cryptoCurrencyList: CryptoCurrencyList[]
    totalCount: string
}
  
export interface CryptoCurrencyList {
    id: number
    name: string
    symbol: string
    slug: string
    cmcRank: number
    marketPairCount: number
    circulatingSupply: number
    selfReportedCirculatingSupply: number
    totalSupply: number
    maxSupply?: number
    ath: number
    atl: number
    high24h: number
    low24h: number
    isActive: number
    lastUpdated: string
    dateAdded: string
    quotes: Quote[]
    isAudited: boolean
    auditInfoList?: (AuditInfoList | AuditInfoList2 | AuditInfoList3)[]
    badges: number[]
}
  
interface AuditInfoList3 {
    coinId: string
    auditor: string
    auditStatus: number
    auditTime: string
    reportUrl: string
}
  
interface AuditInfoList2 {
    coinId: string
    auditor: string
    auditStatus: number
    reportUrl: string
}
  
interface AuditInfoList {
    coinId: string
    auditor: string
    auditStatus: number
    auditTime?: string
    reportUrl: string
}
  
export interface Quote {
    name: string
    price: number
    volume24h: number
    volume7d: number
    volume30d: number
    marketCap: number
    selfReportedMarketCap: number
    percentChange1h: number
    percentChange24h: number
    percentChange7d: number
    lastUpdated: string
    percentChange30d: number
    percentChange60d: number
    percentChange90d: number
    fullyDilluttedMarketCap: number
    marketCapByTotalSupply: number
    dominance: number
    turnover: number
    ytdPriceChangePercentage: number
    percentChange1y: number
}
/** --------------------------------------------------- */