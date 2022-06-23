import 'package:flutter/material.dart';
import 'package:todo_flutter/todoList.dart';

import 'dart:ui';
import 'package:flutter/widgets.dart';

extension DarkMode on BuildContext {
  bool get isDarkMode {
    final brightness = MediaQuery.of(this).platformBrightness;
    return brightness == Brightness.dark;
  }
}

void main() => runApp(const TODO());

class TODO extends StatelessWidget {
  const TODO({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Todo list',
      home: TodoList(),
      debugShowCheckedModeBanner: false,
    );
  }
}
