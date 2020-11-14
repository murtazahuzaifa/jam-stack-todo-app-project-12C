import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
    padding: 10px 0;
`
export const Input = styled.input`
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 15px 0px 0px 15px;
    font-size:15px;
    background-color: transparent;
    transition: .15s ease-in-out;
    &:focus{
        border: 1px solid grey;
    }
`

export const Button = styled.button`
    border-radius: 0px 15px 15px 0px;
    background-color: 	#F5FFFA;
    border: 1px solid lightgray;
    padding: 10px;
    font-size:15px;
    transition: .10s ease-in-out;
    &:focus{
        border: 1px solid grey;
    }
    &:active{
        background-color: #F0F8FF;
    }
`