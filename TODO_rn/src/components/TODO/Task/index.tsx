import React, {FC} from 'react';
import {Pressable, Text, useColorScheme, View} from 'react-native';

import {Task as TaskType} from '../';
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
      <Pressable onPress={() => onCheck(!task.finish)}>
        <View
          style={[styles.checkbox, task.finish && styles.checkboxChecked]}
        />
      </Pressable>
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
