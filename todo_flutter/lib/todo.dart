import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:todo_flutter/colors.dart';
import 'package:todo_flutter/todoList.dart';
import 'package:todo_flutter/utils/HexColor.dart';
import 'package:flutter/foundation.dart';

class TodoItem extends StatelessWidget {
  TodoItem(
      {required this.task,
      required this.onTaskChanged,
      required this.onDeleteTap})
      : super(key: ObjectKey(task));

  final Task task;
  final onTaskChanged;
  final onDeleteTap;

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

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          color: ThemeColors.lightGrey,
          borderRadius: BorderRadius.circular(10)),
      padding: const EdgeInsets.symmetric(vertical: 15, horizontal: 20),
      margin: const EdgeInsets.only(top: 10),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: <Widget>[
          SizedBox(
              width: 30,
              child: GestureDetector(
                onTap: () => onTaskChanged(task),
                child: ConstrainedBox(
                    constraints: const BoxConstraints(
                      maxHeight: 30,
                      minHeight: 30,
                      minWidth: 30,
                      maxWidth: 30,
                    ),
                    child: DecoratedBox(
                      decoration: _getCheckStyle(),
                    )),
              )),
          Expanded(
            flex: 6,
            child: Container(
                margin: const EdgeInsets.only(left: 10),
                child: Text(
                  task.title,
                  style: const TextStyle(fontSize: 16),
                )),
          ),
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
