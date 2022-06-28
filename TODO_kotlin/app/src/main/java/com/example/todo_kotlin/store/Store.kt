package com.example.todo_kotlin.store

import com.example.todo_kotlin.models.Action
import androidx.arch.core.util.Function

interface Store<T> {
    fun dispatch(action: Action)

    fun subscribe(renderer: Renderer<T>, func: Function<T, T> = Function { it })
}