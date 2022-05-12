import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}

interface CoinHistoryInterface {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data: coinHistoryData } = useQuery<CoinHistoryInterface[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 1000,
        }
    )

    console.log(coinId);
    return <h1>{
        isLoading ? (
            "Loading chart...."
        ) : (
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Price",
                        data: coinHistoryData!.map(price => price.close),
                    }
                ]}
                options={{
                    theme: {
                        mode: "dark"
                    },
                    chart: {
                        height: 500,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    grid: {
                        show: false,
                    },
                    yaxis: {
                        show: false
                    },
                    xaxis: {
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        labels: { show: false },
                        type: "datetime",
                        categories: coinHistoryData!.map(price => price.time_close),
                    },
                    fill: {
                        type: "gradient",
                        gradient: { gradientToColors: ["blue"], stops: [0, 100] }
                    },
                    colors: ["red"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$${value.toFixed(2)}`
                        },
                    }
                }}
            >

            </ApexChart>
        )}
    </h1>
}

export default Chart;