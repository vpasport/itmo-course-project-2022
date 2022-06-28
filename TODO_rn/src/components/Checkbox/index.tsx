import React, {FC} from 'react';
import {Pressable, View, StyleSheet, ColorSchemeName} from 'react-native';

import {colors} from '../../theme';

const useStyles = () =>
  StyleSheet.create({
    checkbox: {
      width: 30,
      height: 30,
      borderColor: colors.grey,
      borderWidth: 2,
      borderRadius: 10,
    },
    checkboxChecked: {
      backgroundColor: colors.blue,
      borderColor: colors.lightBlue,
    },
  });

type CheckboxProps = {
  selected: Boolean;
  onPress: () => void;
};

const Checkbox: FC<CheckboxProps> = ({selected, onPress}) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.checkboxChecked]} />
    </Pressable>
  );
};

export {Checkbox};
