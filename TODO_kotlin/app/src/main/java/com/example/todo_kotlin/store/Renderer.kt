package com.example.todo_kotlin.store

import androidx.lifecycle.LiveData

interface Renderer<T> {
    fun render(model: LiveData<T>)
}