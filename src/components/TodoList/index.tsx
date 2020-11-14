import React, { FC } from 'react'
import { TodoType } from '../../pages/index';
import * as s from './style';

const TodoList: FC<{ todos: TodoType[] }> = ({ todos }) => {
    return (
        <s.Wrapper>
            <h1>TODOS LIST</h1>
            {
                todos.map((todo, idx) => {
                    return <s.Todo id={idx} key={idx} >
                        <span>{todo.todo}</span>
                    </s.Todo>
                })
            }
        </s.Wrapper>
    )
}

export default TodoList;
