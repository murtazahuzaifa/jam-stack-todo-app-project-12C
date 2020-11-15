import React, { FC } from 'react'
import { TodoType } from '../../pages/index';
import * as s from './style';

export interface Props {
     todos: TodoType[], 
     onDeleteTodo?: (id: TodoType['id']) => void,
     onUpdate?: ()=>void,
     };
const TodoList: FC<Props> = ({ todos, onDeleteTodo, onUpdate }) => {
    return (
        <s.Wrapper>
            <div>
                <h1>TODOS LIST</h1>
                <s.RefreshBtn onClick={()=>{onUpdate && onUpdate()}} />
            </div>
            {
                todos.map((todo, idx) => {
                    return <s.Todo key={idx} _id={idx} >
                        <span>{todo.text}</span>
                        <s.DeletBtn onClick={() => { onDeleteTodo && onDeleteTodo(todo.id) }} >Delete</s.DeletBtn>
                    </s.Todo>
                })
            }
        </s.Wrapper>
    )
}

export default TodoList;
