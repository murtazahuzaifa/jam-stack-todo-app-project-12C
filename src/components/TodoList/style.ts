import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.1) ;
    margin: 20px 0;
    padding: 15px;
    >h1{
        margin: 10px auto;
        color: #660000;
    }
`

export const Todo = styled.div.attrs((props: { id: number }) => ({
    _color: ({ id }) => id%2 === 0 ? 'rgba(0,0,0,.05)' : 'transparent',
}))`
    font-size: larger;
    background-color: ${({ _color }) => _color};
    color: rgb(70,70,70);
    padding: 10px;

`