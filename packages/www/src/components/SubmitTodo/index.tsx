import React, { FC, FormEvent, FormEventHandler, HtmlHTMLAttributes, useState } from 'react'
import { TodoType } from '../../pages/index';
import * as s from './style';

export interface Props {
    onSubmitTodo?: (todo: TodoType['todo']) => void,
}

const SubmitTodo: FC<Props> = ({ onSubmitTodo }) => {
    const [todo, setTodo] = useState<TodoType['todo']>('');

    const handleSubmit:FormEventHandler = (e) => {
        e.preventDefault();
        onSubmitTodo && onSubmitTodo(todo||'Empty');
        setTodo('');
    }

    return (
        <s.Form onSubmit={handleSubmit}>
            <s.Input
                placeholder="Todo here.."
                value={todo} onChange={e => { setTodo(e.target.value) }}
                type="text"
            />
            <s.Button type='submit' >Add Todo</s.Button>
        </s.Form>
    )
}

export default SubmitTodo;
