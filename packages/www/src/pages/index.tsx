import React, { FC, useState, useEffect } from 'react';
import { PageLayout, Seo, TodoList, SubmitTodo, Loader } from '../components';
import { PageProps, } from 'gatsby';
import http from '../services/http';
import { useQuery, gql } from '@apollo/client';

export type TodoType = { id: string, text: string, ts: number };
export type StateType = {
    isLoading: boolean,
    isError: boolean,
    todos: TodoType[],
}

const initialSate: StateType = {
    isLoading: false,
    isError: false,
    todos: []
}

const query = gql`
    { todos{ text, id, ts } }
`

const index: FC<PageProps> = () => {
    const [state, setState] = useState<StateType>(initialSate);
    const { data, error, loading, refetch, } = useQuery(query);

    const handleUpdateTodos = () => {
        setState({ ...state, isLoading: true });
        http.get('/.netlify/functions/todo')
            .then(({ data }) => {
                const todos = data.todos.map((d) => ({
                    text: d.todo, id: d.id, ts: Number(d.timeStamp)
                })) as TodoType[]
                setState({ ...state, todos: [...todos], isLoading: false })
            })
            .catch(({ response }) => { console.log(response); setState({ ...state, isLoading: false }); })
    }
    const handleAddTodo = (todoText: TodoType['text']) => {
        setState({ ...state, isLoading: true });
        http.post('/.netlify/functions/todo', { todo: todoText })
            .then(() => { handleUpdateTodos(); setState({ ...state, isLoading: false }) })
            .catch(({ response }) => { console.log(response); setState({ ...state, isLoading: false }); })
    };
    const handleDeleteTodo = (id: TodoType['id']) => {
        setState({ ...state, isLoading: true });
        http.delete('/.netlify/functions/todo', { headers: { todoid: id } })
            .then(({ data }) => {
                setState({
                    ...state,
                    isLoading: false,
                    todos: [...state.todos.filter((todo) => todo.id !== id)]
                })
            })
            .catch(({ response }) => { console.log(response); setState({ ...state, isLoading: false }); })
    }

    // useEffect(handleUpdateTodos, [])
    useEffect(() => {
        if (data) {
        console.log('useEffect')

            const todos = data.todos.map((d) => ({
                text: d.text, id: d.id, ts: Number(d.timeStamp)
            })) as TodoType[]
            setState({ ...state, todos: [...todos], isLoading: false })
        }
    }, [data])

    return (
        <PageLayout>
            <Seo />
            <div>
                <div><SubmitTodo onSubmitTodo={handleAddTodo} /></div>
                <div>
                    <TodoList
                        todos={state.todos}
                        onDeleteTodo={handleDeleteTodo}
                        onUpdate={refetch}
                    />
                </div>
            </div>
            <Loader isLoading={loading} />
        </PageLayout>
    )
}

export default index;