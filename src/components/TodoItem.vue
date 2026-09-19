<script setup lang="ts">
import {computed} from "vue";
import type {Todo} from "../models/item.ts";

interface Props {
    todo: Todo
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: "toggle", id: number): void;
}>();

const dueDate = computed(() => props.todo.time.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
}))
</script>

<template>
    <li class="todo-item" :class="{ done: todo.check }">
        <label class="label">
            <input type="checkbox" :checked="todo.check" @change="emit('toggle', todo.id)" />
            <span class="title">{{ todo.title }}</span>
        </label>
        <span class="due">due: {{ dueDate }}</span>
    </li>
</template>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    font-size: 16px;
    color: var(--text-h);
}

.todo-item + .todo-item {
    border-top: 1px solid var(--border);
}

.label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.due {
    font-size: 14px;
    color: var(--text);
    white-space: nowrap;
}

.done .title {
    text-decoration: line-through;
    color: var(--text);
}
</style>
