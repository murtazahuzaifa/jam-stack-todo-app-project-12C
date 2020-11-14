import React from 'react'
import { TodoType } from '../../pages/index';
import * as s from './style';

const SubmitTodo = () => {
    return (
        <s.Wrapper>
            <s.Input placeholder="Todo here.." type="text"/>
            <s.Button>Add Todo</s.Button>
        </s.Wrapper>
    )
}

export default SubmitTodo;
