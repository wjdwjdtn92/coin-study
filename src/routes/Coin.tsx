import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, matchPath } from "react-router-dom";
// import { useRouteMatch } from "react-router-dom";
import { Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoin, fetchTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 600px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.contentBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.contentBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Button = styled.button`
    text-align: center;
    border-radius: 15px;
    width: 120px;
    height: 50%;
    padding: 10px 25px;
    border: 2px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.contentBgColor};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    color: ${(props) => props.theme.textColor};
    /* float: left; */

    transition: all 0.3s ease;
    
    &:hover {
        border: 2px solid ${(props) => props.theme.accentColor};;
    }
`

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
        KRW: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    const { coinId } = useParams<keyof RouteParams>();
    // const [loading, setLoading] = useState(true);
    const location = useLocation();
    const state = location.state as RouteState;
    const navigate = useNavigate();
    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();
    const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => fetchCoin(coinId!))
    const { isLoading: priceLoading, data: priceInfo } = useQuery<PriceData>(
        ["price", coinId],
        () => fetchTickers(coinId!),
        {
            refetchInterval: 10000,
        }
    )
    const priceMatch = matchPath("/:coinId/price", location.pathname);
    const chartMatch = matchPath("/:coinId/chart", location.pathname);

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    //         ).json();
    //         const priceData = await (
    //             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    //         ).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    const loading = infoLoading || priceLoading

    return <Container>
        <Helmet>
            <title>
                {state?.name ? state.name : loading ? "Loading.." : info?.name}
            </title>
        </Helmet>
        <Header>
            <Button onClick={() => navigate(-1)}> Go back</Button>
            <Title>{state?.name ? state.name : loading ? "Loading.." : info?.name}</Title>
        </Header>
        {loading ? (
            <Loader>"Loading..."</Loader>
        ) : (
            <>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{info?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>{info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Price:</span>
                        <span>${priceInfo?.quotes.USD.price.toFixed(3)}</span>
                    </OverviewItem>
                </Overview>
                <Description>{info?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Suply:</span>
                        <span>{priceInfo?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{priceInfo?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to={`/${coinId}/chart`}>Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to={`/${coinId}/price`}>Price</Link>
                    </Tab>
                </Tabs>

                <Outlet context={chartMatch ? { coinId } : priceMatch ? priceInfo : null} />
                {/* <Routes>
                    <Route path={`/${coinId}/price`} element={<Price />} />
                    <Route path={`/${coinId}/chart`} element={<Chart />} />
                </Routes> */}
            </>
        )
        }
    </Container>;
}

export default Coin;