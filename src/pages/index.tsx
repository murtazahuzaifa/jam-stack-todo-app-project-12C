import React, { FC, useState, useEffect } from 'react';
import { PageLayout, Seo, TodoList, SubmitTodo, Loader } from '../components';
import { PageProps, } from 'gatsby';
import axios from 'axios';

export type TodoType = { id: string, todo: string, ts: number };
export type StateType = {
    isLoading: boolean,
    isError: boolean,
    data: TodoType[],
}

const initialSate: StateType = {
    isLoading: false,
    isError: false,
    data: [
        // { id: 1, todo: 'hello world', ts: 1605426417555000 },
        // { id: 2, todo: 'JAM Stack todo', ts: 1605426417555000 },
        // { id: 3, todo: 'Author is Murtaza', ts: 1605426417555000 },
    ]
}

const index: FC<PageProps> = () => {
    const [state, setState] = useState<StateType>(initialSate);

    const handleUpdateTodos = () => {
        setState({...state,isLoading:true});
        axios.get('/.netlify/functions/todo')
            .then(({ data }) => {
                const todos = data.todos.map((d) => ({
                    todo: d.todo, id: d.id, ts: Number(d.timeStamp)
                })) as TodoType[]
                setState({ ...state, data: todos,isLoading:false })
            })
            .catch(({ response }) => { console.log(response); setState({...state,isLoading:false}); })
    }
    const handleAddTodo = (todo: TodoType['todo']) => {
        setState({...state,isLoading:true});
        axios.post('/.netlify/functions/todo', { todo })
            .then(() => { handleUpdateTodos(); setState({...state,isLoading:false}) })
            .catch(({ response }) => { console.log(response);setState({...state,isLoading:false}); })
    };
    const handleDeleteTodo = (id: TodoType['id']) => {
        setState({...state,isLoading:true});
        axios.delete('/.netlify/functions/todo', { headers: { todoid: id } })
            .then(({ data }) => {
                setState({
                    ...state,
                    isLoading: false,
                    data: [...state.data.filter((todo) => todo.id !== id)]
                })
            })
            .catch(({ response }) => { console.log(response); setState({...state,isLoading:false}); })
    }

    useEffect(handleUpdateTodos, [])

    return (
        <PageLayout>
            <Seo />
            <div>
                <div><SubmitTodo onSubmitTodo={handleAddTodo} /></div>
                <div><TodoList todos={state.data} onDeleteTodo={handleDeleteTodo} onUpdate={handleUpdateTodos} /></div>
            </div>
            <Loader isLoading={state.isLoading} />
        </PageLayout>
    )
}

export default index;