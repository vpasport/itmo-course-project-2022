package com.example.todo_kotlin

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.todo_kotlin.models.Todo

class CustomRecyclerAdapter(
    private val todos: List<Todo>,
    private val onCheckBoxClick: ((Todo) -> Any),
    private val onDeleteClick: ((Todo) -> Any)
) : RecyclerView
.Adapter<CustomRecyclerAdapter.MyViewHolder>() {

    class MyViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val titleTextView = view.findViewById<TextView>(R.id.textView)
        val checkboxView = view.findViewById<CheckBox>(R.id.checkBox)
        val deleteButton = view.findViewById<ImageView>(R.id.deleteButton)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.todo_item, parent, false)
        return MyViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.titleTextView.text = todos[position].text
        holder.checkboxView.isChecked = todos[position].finished

        holder.checkboxView.setOnClickListener { _ -> onCheckBoxClick(todos[position]) }
        holder.deleteButton.setOnClickListener { _ -> onDeleteClick(todos[position]) }
    }

    override fun getItemCount() = todos.size
}