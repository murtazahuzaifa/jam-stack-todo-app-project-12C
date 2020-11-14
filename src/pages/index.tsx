import React, { FC, useState } from 'react';
import { PageLayout, Seo, TodoList, SubmitTodo } from '../components';
import { PageProps, } from 'gatsby';

export type TodoType = { id: number, todo: string };
export type StateType = {
    isFetching: boolean,
    isError: boolean,
    data: TodoType[],
}

const initialSate: StateType = {
    isFetching: false,
    isError: false,
    data: [
        { id: 1, todo: 'hello world' },
        { id: 2, todo: 'JAM Stack todo' },
        { id: 3, todo: 'Author is Murtaza' },
        { id: 4, todo: 'Author is Murtaza' },
        { id: 5, todo: 'Author is Murtaza' },
        { id: 6, todo: 'JAM Stack todo' },
        { id: 7, todo: 'JAM Stack todo' },
    ]
}


const index: FC<PageProps> = () => {
    const [state, setState] = useState<StateType>(initialSate);

    const addTodo = (todo: TodoType) => { setState({ ...state, data: [...state.data, todo] }) };
    const deleteTodo = (id: TodoType['id']) => {
        setState({
            ...state,
            data: [...state.data.filter((todo) => todo.id !== id)]
        })
    }

    return (
        <PageLayout>
            <Seo />
            <div>
                <div><SubmitTodo /></div>
                <div><TodoList todos={state.data} /></div>
            </div>
        </PageLayout>
    )
}

export default index;
