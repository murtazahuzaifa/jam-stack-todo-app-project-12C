import React, { FC } from 'react'
import { TodoType } from '../../pages/index';
import * as s from './style';

const TodoList: FC<{ todos: TodoType[] }> = ({ todos }) => {
    return (
        <s.Wrapper>
            <h1>TODOS LIST</h1>
            {
                todos.map((todo, idx) => {
                    return <s.Todo key={idx} _id={idx} > 
                        <span>{todo.todo}</span> <s.DeletBtn>Delete</s.DeletBtn>
                    </s.Todo>
                })
            }
        </s.Wrapper>
    )
}

export default TodoList;
