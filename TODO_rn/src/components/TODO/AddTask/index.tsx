import React, {FC, useState} from 'react';
import {useColorScheme, View, Pressable, Text, TextInput} from 'react-native';
import {colors} from '../../../theme';

import {useStyles} from '../useStyles';

type Props = {
  onAdd: (title: string) => void;
};

const AddTask: FC<Props> = ({onAdd}) => {
  const theme = useColorScheme();
  const styles = useStyles(theme);

  const [value, setValue] = useState<string>('');

  return (
    <View style={styles.main}>
      <Pressable
        onPress={() => value.length > 0 && (onAdd(value), setValue(''))}>
        <View style={styles.addContainer}>
          <Text style={styles.addText}>+</Text>
        </View>
      </Pressable>
      <TextInput
        placeholder="Введите нвзвание..."
        placeholderTextColor={colors.grey}
        style={styles.input}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

export {AddTask};
