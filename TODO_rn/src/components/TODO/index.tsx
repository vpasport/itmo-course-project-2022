import React, {useState} from 'react';
import {
  ColorSchemeName,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {colors} from '../../theme';
import {AddTask} from './AddTask';
import {Task as TaskComponent} from './Task';

const useStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme === 'dark' ? Colors.black : Colors.white,
      flex: 1,
    },
    inputContainer: {
      display: 'flex',
      paddingHorizontal: 10,
    },
    input: {
      borderColor: theme === 'dark' ? colors.grey : colors.blue,
      color: theme === 'dark' ? colors.white : colors.black,
      fontSize: 20,
      borderWidth: 2,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    tasks: {
      paddingHorizontal: 10,
    },
    text: {
      paddingTop: 10,
      color: theme === 'dark' ? colors.white : colors.black,
      fontSize: 20,
      fontWeight: '600',
    },
  });

type Props = {};

export type Task = {
  title: string;
  finish: boolean;
};

// const defaultTasks: Array<Task> = [
//   {
//     title: 'Task 1',
//     finish: false,
//   },
//   {
//     title: 'Task 2',
//     finish: false,
//   },
//   {
//     title: 'Task 3',
//     finish: false,
//   },
//   {
//     title: 'Task 4',
//     finish: false,
//   },
//   {
//     title: 'Task 5',
//     finish: false,
//   },
//   {
//     title: 'Task 6',
//     finish: true,
//   },
// ];

const defaultTasks: Array<Task> = [
  ...Array<Task>(2500).fill({title: 'Task', finish: false}),
  ...Array<Task>(2500).fill({title: 'Task', finish: false}),
];

const TODO: React.FC<Props> = () => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const styles = useStyles(colorScheme);

  const [todos, setTodos] = useState<Array<Task>>(defaultTasks);

  return (
    <ScrollView style={styles.main}>
      <View style={styles.tasks}>
        <Text style={styles.text}>Задачи:</Text>
        {todos
          .filter(el => el.finish === false)
          .map((el, i) => (
            <TaskComponent
              key={i}
              task={el}
              onCheck={checked =>
                setTodos(prev => {
                  const tmp = [...prev];
                  tmp[todos.findIndex(_el => _el === el)].finish = checked;
                  return [...tmp];
                })
              }
              onDelete={() =>
                setTodos(prev => {
                  const tmp = [...prev];
                  tmp.splice(
                    todos.findIndex(_el => _el === el),
                    1,
                  );
                  return tmp;
                })
              }
            />
          ))}
      </View>
      <View style={styles.inputContainer}>
        <AddTask
          onAdd={title => {
            setTodos(prev => [...prev, {title, finish: false}]);
          }}
        />
      </View>
      <View style={styles.tasks}>
        <Text style={styles.text}>Выполнено:</Text>
        {todos
          .filter(el => el.finish === true)
          .map((el, i) => (
            <TaskComponent
              key={i}
              task={el}
              onCheck={checked =>
                setTodos(prev => {
                  const tmp = [...prev];
                  tmp[todos.findIndex(_el => _el === el)].finish = checked;
                  return [...tmp];
                })
              }
              onDelete={() =>
                setTodos(prev => {
                  const tmp = [...prev];
                  tmp.splice(
                    todos.findIndex(_el => _el === el),
                    1,
                  );
                  return tmp;
                })
              }
            />
          ))}
      </View>
    </ScrollView>
  );
};

export {TODO};
