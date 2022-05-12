import { useParams } from "react-router-dom";
// import styled from "styled-components";

// const Container = styled.div`
//     padding: 0px 20px;
// `;

// const Header = styled.header`
//     height: 10vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

interface RouteParams {
    coinId: string;
}

function Coin() {
    const { coinId } = useParams<RouteParams>();
    console.log(coinId)
    return <h1>coin: {coinId}</h1>
}

export default Coin;