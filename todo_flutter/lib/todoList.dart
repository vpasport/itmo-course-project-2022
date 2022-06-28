import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:todo_flutter/addTodo.dart';
import 'package:todo_flutter/colors.dart';
import 'package:todo_flutter/todo.dart';
import 'package:flutter/foundation.dart';

import 'package:todo_flutter/utils/DarkMode.dart';

class Task {
  Task({required this.title, required this.finished});

  final String title;
  bool finished;
}

class _TodoListState extends State<TodoList> {
  final List<Task> _todos = <Task>[
    Task(title: 'task 1', finished: false),
    Task(title: 'task 2', finished: false),
    Task(title: 'task 3', finished: false),
    Task(title: 'task 4', finished: false),
    Task(title: 'task 5', finished: false),
    Task(title: 'task 6', finished: true),
  ];

  void _handleChange(Task task) {
    setState(() {
      task.finished = !task.finished;
    });
  }

  void _onDeleteTask(Task task) {
    setState(() {
      _todos.remove(task);
    });
  }

  void _onAddTask(title) {
    setState(() {
      _todos.add(Task(title: title, finished: false));
    });
  }

  bool _isDarkMode() {
    return SchedulerBinding.instance!.window.platformBrightness ==
        Brightness.dark;
  }

  TextStyle? _getTextStyle() {
    return _isDarkMode()
        ? const TextStyle(
            fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)
        : const TextStyle(
            fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: _isDarkMode() ? ThemeColors.black : ThemeColors.white,
        body: SafeArea(
            child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                    margin: const EdgeInsets.only(left: 10),
                    child: Text(
                      'Задачи:',
                      style: _getTextStyle(),
                    )),
                ListView(
                  padding: const EdgeInsets.symmetric(vertical: 8.0),
                  physics: const NeverScrollableScrollPhysics(),
                  children: _todos
                      .where((Task task) => !task.finished)
                      .map((Task task) => TodoItem(
                            task: task,
                            onTaskChange: _handleChange,
                            onDeleteTap: _onDeleteTask,
                            isDarkMode: _isDarkMode(),
                          ))
                      .toList(),
                  shrinkWrap: true,
                ),
                AddTodo(
                  onCreate: _onAddTask,
                  isDarkMode: _isDarkMode(),
                ),
                Container(
                    margin: const EdgeInsets.only(left: 10, top: 20),
                    child: Text('Выполнено:', style: _getTextStyle())),
                ListView(
                  padding: const EdgeInsets.symmetric(vertical: 8.0),
                  physics: const NeverScrollableScrollPhysics(),
                  children: _todos
                      .where((Task task) => task.finished)
                      .map((Task task) => TodoItem(
                            task: task,
                            onTaskChange: _handleChange,
                            onDeleteTap: _onDeleteTask,
                            isDarkMode: _isDarkMode(),
                          ))
                      .toList(),
                  shrinkWrap: true,
                ),
              ],
            ),
          ),
        )));
  }
}

class TodoList extends StatefulWidget {
  const TodoList({Key? key}) : super(key: key);

  @override
  _TodoListState createState() => _TodoListState();
}
