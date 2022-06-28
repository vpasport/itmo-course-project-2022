package com.example.todo_kotlin

import android.os.Bundle
import android.widget.EditText
import android.widget.ImageView
import android.widget.ListView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.LiveData
import androidx.lifecycle.Observer
import com.example.todo_kotlin.store.TodoStore

import androidx.arch.core.util.Function
import androidx.lifecycle.ViewModelProvider
import com.example.todo_kotlin.models.*
import com.example.todo_kotlin.store.Renderer
import com.google.android.material.textfield.TextInputEditText

class MainActivity : AppCompatActivity(), Renderer<TodoModel> {
    private lateinit var store: TodoStore

    private lateinit var notFinishedListView: ListView
    private lateinit var finishedListView: ListView
    private lateinit var addButton: ImageView
    private lateinit var addText: EditText

    override fun render(model: LiveData<TodoModel>) {
        model.observe(this, Observer { newState ->
            notFinishedListView.adapter = TodoAdapter(
                this,
                (newState?.todos?.filter { !it.finished } ?: listOf()) as ArrayList<Todo>,
                { todo -> toggleTodo(todo) },
                { todo -> deleteTodo(todo) }
            )
            finishedListView.adapter = TodoAdapter(
                this,
                (newState?.todos?.filter { it.finished } ?: listOf()) as ArrayList<Todo>,
                { todo -> toggleTodo(todo) },
                { todo -> deleteTodo(todo) }
            )
        })
    }

    private val mapStateToProps = Function<TodoModel, TodoModel> {
        val keep: (Todo) -> Boolean = when (it.visibility) {
            is Visibility.All -> { _ -> true }
            is Visibility.Active -> { t: Todo -> !t.finished }
            is Visibility.Completed -> { t: Todo -> t.finished }
        }

        return@Function it.copy(todos = it.todos.filter { keep(it) })
    }

    private fun toggleTodo(todo: Todo) {
        store.dispatch(ToggleTodo(todo.id))
    }

    private fun deleteTodo(todo: Todo) {
        store.dispatch(RemoveTodo(todo.id))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        notFinishedListView = findViewById(R.id.notFinishedListView)
        finishedListView = findViewById(R.id.finishedListView)
        addButton = findViewById(R.id.addButton)
        addText = findViewById(R.id.addText)

        store = ViewModelProvider(
            this,
            ViewModelProvider.NewInstanceFactory()
        ).get(TodoStore::class.java)
        store.subscribe(this, mapStateToProps)

        store.dispatch(RemoveTodos())

        store.dispatch(AddTodo("Task 1"))
        store.dispatch(AddTodo("Task 2"))
        store.dispatch(AddTodo("Task 3"))
        store.dispatch(AddTodo("Task 4"))
        store.dispatch(AddTodo("Task 5"))
        store.dispatch(AddFinishedTodo("Task 6"))

        addButton.setOnClickListener { _ ->
            store.dispatch(AddTodo(addText.text.toString()))
            addText.setText("")
            addText.clearFocus()
        }
    }
}