import 'package:flutter/material.dart';
import 'package:todo_flutter/colors.dart';

import 'colors.dart';

class AddTodo extends StatelessWidget {
  AddTodo({Key? key, required this.onCreate, required this.isDarkMode})
      : super(key: key);

  TextEditingController titleController = TextEditingController();

  final onCreate;
  final isDarkMode;

  TextStyle? _getTextStyle() {
    return isDarkMode
        ? const TextStyle(fontSize: 16, color: Colors.white)
        : const TextStyle(fontSize: 16, color: Colors.black);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          color: isDarkMode ? ThemeColors.darkGrey : ThemeColors.lightGrey,
          borderRadius: BorderRadius.circular(10)),
      padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
      margin: const EdgeInsets.only(top: 10),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: <Widget>[
          SizedBox(
            width: 30,
            child: SizedBox(
                width: 30,
                height: 30,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                      color: ThemeColors.blue,
                      border:
                          Border.all(color: ThemeColors.lightBlue, width: 2),
                      borderRadius: BorderRadius.circular(10)),
                  child: Center(
                      child: SizedBox(
                          width: 30,
                          height: 30,
                          child: IconButton(
                            iconSize: 30,
                            padding: EdgeInsets.zero,
                            icon: Icon(Icons.add, color: ThemeColors.lightBlue),
                            onPressed: () =>
                                onCreate(titleController.value.text),
                          ))),
                )),
          ),
          Expanded(
            flex: 1,
            child: Container(
                margin: const EdgeInsets.only(left: 10),
                child: TextField(
                  controller: titleController,
                  textAlign: TextAlign.left,
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    hintText: 'Введите название...',
                    hintStyle: TextStyle(color: Colors.grey),
                  ),
                  style: _getTextStyle(),
                )),
          ),
        ],
      ),
    );
  }
}
