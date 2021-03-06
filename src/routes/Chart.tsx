import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import dayjs from "dayjs";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartInterface {
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

const Container = styled.div`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.contentBgColor};
`


function Chart() {
    const { coinId } = useOutletContext<ChartInterface>();
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data: coinHistoryData } = useQuery<CoinHistoryInterface[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    )

    // coinHistoryData!.map(price => 
    //     console.log(price.time_close)
    // )

    return <Container>{
        isLoading ? (
            "Loading chart...."
        ) : (
            <ApexChart
                type="candlestick"
                series={[
                    {
                        name: "Price",
                        data: coinHistoryData!.map(price => (
                            {
                                x: new Date(price.time_close),
                                y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                            }
                        ))
                        // y: [1,2,3,4],
                    }
                ]}
                options={{
                    theme: {
                        mode: isDark ? "dark" : "light",
                    },
                    chart: {
                        height: 350,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    title: {
                        text: `${coinId.toUpperCase()}`,
                        align: 'center',
                    },
                    plotOptions: {
                        candlestick: {
                            wick: {
                                useFillColor: true,
                            }
                        }
                    },
                    stroke: {
                        width: 3,
                    },
                    yaxis: {
                        tooltip: {
                            enabled: false
                        },
                        labels: {
                            formatter: (value) => `$${value.toFixed(2)}`
                        },
                    },

                    xaxis: {
                        type: 'category',
                        labels: {
                            formatter: function (val) {
                                return dayjs(val).format('MMM DD');
                            }
                        },
                    },
                }}
            >

            </ApexChart>
        )}
    </Container>
}

export default Chart;