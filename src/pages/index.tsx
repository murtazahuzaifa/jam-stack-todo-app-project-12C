import React, { FC, useState } from 'react';
import { PageLayout, Seo, TodoList, SubmitTodo } from '../components';
import { PageProps, } from 'gatsby';
import axios from 'axios';

export type TodoType = { id: number, todo: string, ts: number };
export type StateType = {
    isFetching: boolean,
    isError: boolean,
    data: TodoType[],
}

const initialSate: StateType = {
    isFetching: false,
    isError: false,
    data: [
        { id: 1, todo: 'hello world', ts: 1605426417555000 },
        { id: 2, todo: 'JAM Stack todo', ts: 1605426417555000 },
        { id: 3, todo: 'Author is Murtaza', ts: 1605426417555000 },
    ]
}

const index: FC<PageProps> = () => {
    const [state, setState] = useState<StateType>(initialSate);

    const handleAddTodo = (todo: TodoType['todo']) => {
        setState({ ...state, data: [...state.data, { id: (state.data.slice(-1)[0]?.id || 0) + 1, todo, ts: Date.now() }] })
    };
    const handleDeleteTodo = (id: TodoType['id']) => {
        setState({
            ...state,
            data: [...state.data.filter((todo) => todo.id !== id)]
        })
    }

    const handleRequest = () => {
        axios.get('/.netlify/functions/todo')
        // axios.post('/.netlify/functions/todo',{todo:'This is JAM stack CRUD app'})
            .then(({ data }) => console.log(data))
            .catch(({ response }) => { console.log(response) })
    }

    return (
        <PageLayout>
            <Seo />
            <div>
                <div><SubmitTodo onSubmitTodo={handleAddTodo} /></div>
                <div><TodoList todos={state.data} onDeleteTodo={handleDeleteTodo} /></div>
            </div>
            <button onClick={() => { handleRequest() }} >Request</button>
        </PageLayout>
    )
}

export default index;
