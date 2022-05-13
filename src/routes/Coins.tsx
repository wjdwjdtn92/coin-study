// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 600px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${props => props.theme.contentBgColor};
    color: ${props => props.theme.textColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        align-items:center;
        transition: color 0.3s ease-in;
        display: flex; // 밖에 영역까지 적용하기 위해
    }

    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width:25px;
    height:25px;
    margin-right: 10px;
`

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


interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rang: number,
    is_new: boolean,
    is_activate: boolean,
    type: string,
}
// https://coinicons-api.vercel.app/api/icon/btc

function Coins() {
    const { isLoading, data } = useQuery<CoinInterface[]>("allConis", fetchCoins)
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    return <Container>
        <Helmet>
            <title>코인</title>
        </Helmet>
        <Header>
            <Title>코인</Title>
        </Header>
        {isLoading ? (
            <Loader>"Loading..."</Loader>
        ) : (
            <CoinList>
                {data?.slice(0, 100).map(coin => (
                    <Coin key={coin.id}>
                        <Link
                            to={`/${coin.id}`}
                            state={{ name: coin.name }}
                        >
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinList>
        )}
    </Container>;
}

export default Coins; 