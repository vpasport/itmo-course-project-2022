package com.example.todo_kotlin

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.arch.core.util.Function
import com.example.todo_kotlin.models.Todo

class TodoAdapter(
    context: Context,
    val todos: List<Todo>,
    val onCheckBoxClick: ((Todo) -> Any),
    val onDeleteClick: ((Todo) -> Any)
) :
    ArrayAdapter<Todo>(context, 0, todos) {
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val view = convertView ?: LayoutInflater.from(context)
            .inflate(R.layout.todo_item, parent, false)
        val titleTextView = view.findViewById<TextView>(R.id.textView)
        val checkboxView = view.findViewById<CheckBox>(R.id.checkBox)
        val deleteButton = view.findViewById<ImageView>(R.id.deleteButton)

        titleTextView.text = todos[position].text
        checkboxView.isChecked = todos[position].finished

        checkboxView.setOnClickListener { _ -> onCheckBoxClick(todos[position]) }
        deleteButton.setOnClickListener { _ -> onDeleteClick(todos[position]) }

        return view
    }

    override fun getItemId(position: Int): Long = todos[position].id
}