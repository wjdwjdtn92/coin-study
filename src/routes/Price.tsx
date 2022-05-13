import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

interface PriceData {
    id: string;
    name: string;
    symbol: string; //
    rank: number; //
    circulating_supply: number;
    total_supply: number; //
    max_supply: number; //
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


const Caption = styled.caption`
    text-align:right;
    color: ${(props) => props.theme.accentColor};
`


const StyledTable = styled.table`
    // custom css goes here
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%; /* responsive */
    border-collapse: collapse;
    margin: auto; 
    text-align: center;

    caption-side: bottom;

    th, td {
        padding: 10px;
        border: 1px solid ${(props) => props.theme.bgColor};
        
    }

`;

const THead = styled.thead`
 // custom css goes here
 /* color: ${(props) => props.theme.accentColor}; */

`;

const TFoot = styled.tfoot`
  // custom css goes here
`;

const TBody = styled.tbody`
 // custom css goes here
`;

const TR = styled.tr`
  // custom css goes here
  /* &:last-child td, &:last-child th {
      border: 0;
    }; */
`;

const TH = styled.th`
  // custom css goes here
`;

const TD = styled.td`
  // custom css goes here
`;



function createData(
    name: string,
    usd: number,
    krw: number,
) {
    return { name, usd, krw };
}


function Price() {
    const priceInfo = useOutletContext<PriceData>();
    console.log(priceInfo);

    const rows = [
        createData('가격', priceInfo.quotes.USD.price, priceInfo.quotes.KRW.price),
        createData('거래량(24h)', priceInfo.quotes.USD.volume_24h, priceInfo.quotes.KRW.volume_24h),
        createData('변동률(24h)', priceInfo.quotes.USD.volume_24h_change_24h, priceInfo.quotes.KRW.volume_24h_change_24h),
        createData('시총', priceInfo.quotes.USD.market_cap, priceInfo.quotes.KRW.market_cap),
        createData('시총변동률(24h)', priceInfo.quotes.USD.market_cap_change_24h, priceInfo.quotes.KRW.market_cap_change_24h),
    ];

    console.log(priceInfo);
    return <StyledTable aria-label="caption table">
        <Caption>{priceInfo.name} price infomation ( Today )</Caption>
        <THead>
            <TR>
                <TD> </TD>
                <TD>USD</TD>
                <TD>KRW</TD>
            </TR>
        </THead>
        <TBody>
            {rows.map((row) => (
                <TR key={row.name}>
                    <TH scope="row">
                        {row.name}
                    </TH>
                    <TD align="right">{row.usd}</TD>
                    <TD align="right">{row.krw}</TD>
                </TR>
            ))}
        </TBody>
    </StyledTable>

}

export default Price;