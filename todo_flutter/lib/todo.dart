import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:todo_flutter/colors.dart';
import 'package:todo_flutter/todoList.dart';
import 'package:todo_flutter/utils/HexColor.dart';
import 'package:flutter/foundation.dart';

class TodoItem extends StatelessWidget {
  TodoItem(
      {required this.task,
      required this.onTaskChange,
      required this.onDeleteTap,
      required this.isDarkMode})
      : super(key: ObjectKey(task));

  final Task task;
  final onTaskChange;
  final onDeleteTap;
  final bool isDarkMode;

  BoxDecoration _getCheckStyle() {
    if (!task.finished) {
      return BoxDecoration(
          border: Border.all(color: ThemeColors.grey, width: 2),
          borderRadius: BorderRadius.circular(10));
    }

    return BoxDecoration(
        color: ThemeColors.blue,
        border: Border.all(color: ThemeColors.lightBlue, width: 2),
        borderRadius: BorderRadius.circular(10));
  }

  TextStyle? _getTextStyle() {
    return isDarkMode
        ? const TextStyle(fontSize: 16, color: Colors.white)
        : const TextStyle(fontSize: 16, color: Colors.black);
  }

  Color _getCheckboxColor(Set<MaterialState> states) {
    const Set<MaterialState> interactiveStates = <MaterialState>{
      MaterialState.pressed,
      MaterialState.hovered,
      MaterialState.focused,
    };
    if (states.any(interactiveStates.contains)) {
      return ThemeColors.blue;
    }
    return ThemeColors.lightBlue;
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
              child: Transform.scale(
                  scale: 1.5,
                  child: Checkbox(
                      checkColor: Colors.white,
                      fillColor:
                          MaterialStateProperty.resolveWith(_getCheckboxColor),
                      value: task.finished,
                      onChanged: (bool? value) => onTaskChange(task)))),
          Expanded(
              flex: 6,
              child: Container(
                  margin: const EdgeInsets.only(left: 10),
                  child: Text(task.title, style: _getTextStyle()))),
          SizedBox(
            width: 30,
            child: IconButton(
                onPressed: () => onDeleteTap(task),
                icon: Icon(
                  Icons.delete,
                  size: 30,
                  color: ThemeColors.red,
                )),
          )
        ],
      ),
    );
  }
}
