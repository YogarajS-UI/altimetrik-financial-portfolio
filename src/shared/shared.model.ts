export type assetObj = {label:string,value:number}


export type  TrendingStock = {
  rank: number;
  ticker: string;
  companyName: string;
  sector: string;
  price: number;
  change24h: string;
  marketCap: string;
  trendDirection: string;
  analystSentiment: string;
}

export type performanceChartObj = {
    date:string,
    portfolio:number,
    sp500:number,
    nasdaq:number
}   

export type assetOption = {type:string, price:number}

export type FinancialMockData = {
  assetAllocation: assetObj[];              // or pieChartObj[] — both match
  trendingStocks: TrendingStock[];
  performanceChart: performanceChartObj[];
  formOptions: assetOption[];
};
