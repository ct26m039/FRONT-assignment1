<script setup lang="ts">
import type {Todo} from "../models/item.ts";
import TodoItem from "./TodoItem.vue";

interface Props {
    todos: Todo[]
}

defineProps<Props>()

const emit = defineEmits<{
    (e: "toggle", id: number): void;
}>();
</script>

<template>
    <p v-if="todos.length === 0" class="empty">Nothing here.</p>
    <ul v-else class="todo-list">
        <todo-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @toggle="emit('toggle', $event)"
        ></todo-item>
    </ul>
</template>

<style scoped>
.todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
}

.empty {
    color: var(--text);
    font-size: 16px;
    padding: 16px 0;
}
</style>
