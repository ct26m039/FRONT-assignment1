<script setup lang="ts">
import {computed, ref} from "vue";
import type {NewTodo, Todo, TodoFilter} from "../models/item.ts";
import TodoList from "./TodoList.vue";

let id = 0

function generateTodo(title: string, time: Date, check: boolean): Todo {
    return {
        id: ++id,
        title: title,
        time: time,
        check: check
    }
}

//Some preset items with random values
const todoList = ref<Todo[]>([
    generateTodo("Grocery Shopping", new Date(2026, 8, 12), true),
    generateTodo("Finish Homework", new Date(2026, 8, 21), false),
    generateTodo("Book Dentist Appointment", new Date(2026, 8, 30), false),
])

function emptyTodo(): NewTodo {
    return {
        title: "",
        time: new Date(),
        check: false,
    }
}

const newTodo = ref<NewTodo>(emptyTodo())

const dateToString = computed({
    get(): string {
        const date = newTodo.value.time
        return date.toISOString().split("T")[0];
    },
    set(value: string) {
        return newTodo.value.time = new Date(value);
    },
})

const filter = ref<TodoFilter>("all")

const activeTodos = computed(() => todoList.value.filter((todo) => !todo.check))
const completedTodos = computed(() => todoList.value.filter((todo) => todo.check))

const filteredTodos = computed<Todo[]>(() => {
    switch (filter.value) {
        case "active":
            return activeTodos.value
        case "completed":
            return completedTodos.value
        default:
            return todoList.value
    }
})


function addTodo() {
    const title = newTodo.value.title.trim()
    if (title === "") {
        return
    }

    todoList.value.push(generateTodo(title, newTodo.value.time, newTodo.value.check))
    newTodo.value = emptyTodo()
}

function toggleTodo(id: number) {
    const todo = todoList.value.find((item) => item.id === id)
    if (todo !== undefined) {
        todo.check = !todo.check
    }
}
</script>

<template>
    <div class="todo-app">
        <form class="add-form" @submit.prevent="addTodo">
            <input type="text" v-model="newTodo.title" placeholder="Add a new item" />
            <input type="date" v-model="dateToString" />
            <button type="submit">Add</button>
        </form>

        <div class="filters">
            <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
                All ({{ todoList.length }})
            </button>
            <button :class="{ active: filter === 'active' }" @click="filter = 'active'">
                To do ({{ activeTodos.length }})
            </button>
            <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">
                Completed ({{ completedTodos.length }})
            </button>
        </div>

        <todo-list :todos="filteredTodos" @toggle="toggleTodo"></todo-list>
    </div>
</template>

<style scoped>
.todo-app {
    width: 560px;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 20px 48px;
    box-sizing: border-box;
    text-align: left;
}

.add-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 20px;
}

.add-form input[type="text"] {
    flex: 1 1 200px;
}

input[type="text"],
input[type="date"] {
    font: inherit;
    font-size: 16px;
    color: var(--text-h);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 10px;
}

input[type="text"]:focus-visible,
input[type="date"]:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
}

button {
    font: inherit;
    font-size: 16px;
    cursor: pointer;
    color: var(--text-h);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 14px;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
}

button:hover {
    border-color: var(--accent-border);
}

.add-form button[type="submit"] {
    color: var(--accent);
    background: var(--accent-bg);
}

.filters {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.filters button.active {
    color: var(--accent);
    background: var(--accent-bg);
    border-color: var(--accent-border);
}
</style>
