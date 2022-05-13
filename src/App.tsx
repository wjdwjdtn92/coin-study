import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from 'react-query/devtools'
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
    box-sizing: border-box;
}
body {
    font-family: 'Gothic A1', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
}
a {
    text-decoration:none;
    color:inherit; 
}
`;

const DarkModeButton = styled.button`
    position: fixed;
    right: 78px;
    bottom: 19px;
    display: inline-block;
    width: 136px;
    height: 53px;
    background-position: -270px -55px;
    background-repeat: no-repeat;
    vertical-align: top;
    cursor: pointer;
    z-index: 100;
    border-radius: 25px;
    border: 2px solid ${(props) => props.theme.titleColor};
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};

    &:hover {
        background-color: ${(props) => props.theme.textColor};
        color: ${(props) => props.theme.bgColor};
    }
`


function App() {
    const [darkMode, setDarkMode] = useState(true);
    const theme = darkMode ? darkTheme : lightTheme;
    const onClick = () => {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router />
            <ReactQueryDevtools />
            <DarkModeButton onClick={onClick}>{darkMode ? "Light Mode" : "Dark Mode" }</DarkModeButton>
        </ThemeProvider>
    );
}

export default App;