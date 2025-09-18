import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let start = searchParams.get("start") || 1;
    let perPage = searchParams.get("perPage") || 1;

    const url = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=${start}&limit=${perPage}&sortBy=rank&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap`;

    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}