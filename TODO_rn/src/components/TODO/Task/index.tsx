import React, {FC} from 'react';
import {Pressable, Text, useColorScheme, View} from 'react-native';

import {Task as TaskType} from '../';
import {Checkbox} from '../../';
import {useStyles} from '../useStyles';

type TaskProps = {
  task: TaskType;
  onCheck: (checked: boolean) => void;
  onDelete: () => void;
};

const Task: FC<TaskProps> = ({task, onCheck, onDelete}) => {
  const theme = useColorScheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.main}>
      <Checkbox onPress={() => onCheck(!task.finish)} selected={task.finish} />
      <Text style={styles.text}>{task.title}</Text>
      <Pressable onPress={() => onDelete()}>
        <View style={styles.deleteContainer}>
          <Text style={styles.delete}>+</Text>
        </View>
      </Pressable>
    </View>
  );
};

export {Task};
