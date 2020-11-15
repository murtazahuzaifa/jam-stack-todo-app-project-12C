import styled from 'styled-components';

export default styled.div<{isLoading:boolean}>`
    &::after{content:"LOADING...."}
    display: ${({isLoading})=> isLoading? 'unset': 'none'};
    font-size: 40px; font-weight: bolder;
    position: absolute;
    top: 0; right:0;
    background-color: rgba(0,0,0,0.4);
    color: whitesmoke;
    height: 100vh;
    width: 100%;
    text-align: center;
    line-height: 100vh;   
`