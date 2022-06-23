import React from 'react';
import {
  Pressable,
  Text,
  GestureResponderEvent,
  ColorSchemeName,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors} from '../../theme';

const useStyles = (theme: ColorSchemeName, width: number | undefined) =>
  StyleSheet.create({
    main: {
      backgroundColor: colors.blue,
      borderRadius: 5,
      width: width || '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    text: {
      fontSize: 20,
      color: Colors.white,
      textAlign: 'center',
    },
  });

type Props = {
  title: string;
  onPress: (event?: GestureResponderEvent) => void;
  width?: number;
};

const Button: React.FC<Props> = ({title, onPress, width}) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const styles = useStyles(colorScheme, width);

  return (
    <Pressable onPress={onPress} style={styles.main}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export {Button};
