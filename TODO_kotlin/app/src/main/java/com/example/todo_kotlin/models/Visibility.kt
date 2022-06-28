package com.example.todo_kotlin.models

sealed class Action

var counter = 0L

data class AddTodo(val text: String, val finished: Boolean = false, val id: Long = counter++) :
    Action()
data class AddFinishedTodo(val text: String, val finished: Boolean = true, val id: Long = counter++) :
    Action()

data class ToggleTodo(val id: Long) : Action()
data class SetVisibility(val visibility: Visibility) : Action()
data class RemoveTodo(val id: Long) : Action()
data class RemoveTodos(val id: Long = 0L) : Action()

sealed class Visibility {
    class All : Visibility()
    class Active : Visibility()
    class Completed : Visibility()
}