import React, { FC, useState, useEffect } from 'react';
import { PageLayout, Seo, TodoList, SubmitTodo, Loader } from '../components';
import { PageProps, } from 'gatsby';
import { useQuery, gql, useMutation } from '@apollo/client';

export type TodoType = { id: string, text: string, ts: number };
export type StateType = {
    isLoading: boolean,
    isError: boolean,
    todos: TodoType[],
}

const initialSate: StateType = {
    isLoading: false,
    isError: false,
    todos: [
        // { id: "282259274377200128", text: 'hello world', ts: 1605426417555000 },
        // { id: "282259282883248640", text: 'JAM Stack todo', ts: 1605426417555000 },
        // { id: "282259305144517123", text: 'Author is Murtaza', ts: 1605426417555000 },
      ]
}

const getTodosQuery = gql`
    { todos{ text, id, ts } }
`
const addTodoMut = gql`
    mutation addNewTodo($text:String!) { 
        addTodo(text: $text){ id, text, ts } 
    }
`
const deleteTodoMut = gql`
    mutation deleteTodo($id:ID!) { 
            deleteTodo(id: $id){ id, text, ts } 
        }
`

const index: FC<PageProps> = () => {
    const [state, setState] = useState<StateType>(initialSate);
    const { data, error, loading, refetch } = useQuery(getTodosQuery);
    const [addNewTodo,] = useMutation(addTodoMut);
    const [deleteTodo,] = useMutation(deleteTodoMut);

    const handleUpdateState = () => {
        const todos = data.todos.map((d) => ({
            text: d.text, id: d.id, ts: Number(d.timeStamp)
        })) as TodoType[]
        setState({ ...state, todos: [...todos], isLoading: false })
    }
    const handleAddTodo = (todoText: TodoType['text']) => {
        setState({ ...state, isLoading: true });
        addNewTodo({ variables: { text: todoText } })
            .then(() => { refetch(); setState({ ...state, isLoading: false }) })
            .catch((err) => { console.log(err); setState({ ...state, isLoading: false }); })
    };
    const handleDeleteTodo = (id: TodoType['id']) => {
        setState({ ...state, isLoading: true });
        deleteTodo({ variables: { id } })
            .then(() => {
                setState({
                    ...state,
                    isLoading: false,
                    todos: [...state.todos.filter((todo) => todo.id !== id)]
                })
            })
            .catch((err) => { console.log(err); setState({ ...state, isLoading: false }); })
    }

    useEffect(() => {
        if (data) {
            handleUpdateState()
        }
    }, [data])

    return (
        <PageLayout>
            <Seo />
            <div>
                <div><SubmitTodo onSubmitTodo={handleAddTodo} /></div>
                <div style={{ color: 'red', display: error ? "unset" : "none" }} >{error}</div>
                <div>
                    <TodoList
                        todos={state.todos}
                        onDeleteTodo={handleDeleteTodo}
                        onUpdate={refetch}
                    />
                </div>
            </div>
            <Loader isLoading={loading || state.isLoading} />
        </PageLayout>
    )
}

export default index;