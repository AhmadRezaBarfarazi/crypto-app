'use client'

import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CryptoCurrencyList, getCryptocurrency, Quote } from "@/app/http/crypto";
import { getCrypto, saveCryptoCurrency } from "@/app/utils/cryptoIndexDB";

const columns: any = [
	{
		name: '#',
		selector: (row: { cmcRank: string; }, ) => row.cmcRank,
		sortable: true,
	},
    {
		name: 'Name',
		selector: (row: { name: string, id: number }) => {
            return (
                <div className="flex gap-2 items-center">
                    <img className="w-7 h-7" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${row.id}.png`} loading="lazy" alt={row.name}/>
                    <span>{row.name}</span>
                </div>
            )
        },
		sortable: true,
	},
    {
		name: 'Price',
		selector: (row: { quotes: Quote[] }, ) => {
            return "$ " + row.quotes[2].price.toLocaleString()
        },
		sortable: true,
	},
    {
		name: '1h',
		selector: (row: { quotes: Quote[] }, ) => {
            return colorUnit(row.quotes[2].percentChange1h, "%")
        },
		sortable: true,
	},
    {
		name: '24h',
		selector: (row: { quotes: Quote[] }, ) => {
            return colorUnit(row.quotes[2].percentChange24h, "%")
        },
		sortable: true,
	},
    {
		name: '7d',
		selector: (row: { quotes: Quote[] }, ) => {
            return colorUnit(row.quotes[2].percentChange7d, "%")
        },
		sortable: true,
	},
    {
		name: '24 Volume',
		selector: (row: { quotes: Quote[] }, ) => {
            return "$ " + row.quotes[2].volume24h.toLocaleString()
        },
		sortable: true,
	},
    {
		name: 'Meket Cap',
		selector: (row: { quotes: Quote[] }, ) => {
            return "$ " + row.quotes[2].marketCap.toLocaleString()
        },
		sortable: true,
	}
];

const colorUnit = (value: number, symbol: string = "") => {
    return <span className={`${(value < 0) ? "text-red-500" : "text-green-700"}`}>{symbol} {value}</span>
}

function Table(){
    const [data, setData] = useState<CryptoCurrencyList[]>([]);
    const [showLimited, setShowLimited] = useState(true);
	const [loading, setLoading] = useState(true);

    const displayedData = showLimited ? data.slice(0, 10) : data;

    useEffect(() => {
        async function fetchData() {
            const cached = await getCrypto();
            if(cached.length > 0){
                setLoading(false);
                setData(cached);
            }else{
                getCryptocurrency().then(async (response) => {
                    setLoading(false);
                    await saveCryptoCurrency(response.data.cryptoCurrencyList);
                    setData(response.data.cryptoCurrencyList);
                });
            }
        }
      
        fetchData();
        setInterval(() => {
            getCryptocurrency().then(async (response) => {
                await saveCryptoCurrency(response.data.cryptoCurrencyList);
                setData(response.data.cryptoCurrencyList);
            });
        }, 2000);
    }, []);

	return (
        <Fragment>
            <DataTable
                columns={columns}
                data={displayedData}
                pagination={!showLimited}
                progressPending={loading}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50, 100]}
                progressComponent={
                    <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        <p>loading...</p>
                    </div>
                }
            />
            {(!loading && showLimited) && (
                <button
                    onClick={() => setShowLimited(prev => !prev)}
                    className="px-4 py-2 bg-blue-500 text-white rounded mx-auto block cursor-pointer my-5"
                >show more</button>
            )}
        </Fragment>
	);
}

export default Table;