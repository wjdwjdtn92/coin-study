import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
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
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [coins]);

    return <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {loading ? (
            <Loader>"Loading..."</Loader>
        ) : (
            <CoinList>
                {coins.map(coin => (
                    <Coin key={coin.id}>
                        <Link
                            to={{
                                pathname: `/${coin.id}`,
                                state: { name: coin.name },
                            }}
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