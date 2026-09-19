export interface Todo {
    id: number,
    title: string,
    time: Date,
    check: boolean
}

//Used as a placeholder for new todos
export type NewTodo = Omit<Todo, "id">

export type TodoFilter = "all" | "active" | "completed"
