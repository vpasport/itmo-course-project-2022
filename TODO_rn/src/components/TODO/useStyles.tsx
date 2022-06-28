import {StyleSheet, ColorSchemeName} from 'react-native';

import {colors} from '../../theme';

const useStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    main: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: theme === 'dark' ? colors.darkGrey : colors.lightGrey,
      marginTop: 10,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16,
      marginLeft: 10,
      flex: 1,
      color: theme === 'dark' ? colors.white : colors.black,
      textAlignVertical: 'center',
    },
    deleteContainer: {
      width: 30,
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'blue',
    },
    delete: {
      transform: [{rotate: '45deg'}],
      top: 0,
      left: 0,
      fontSize: 30,
      color: colors.red,
      marginLeft: 6,
      marginTop: -5,
    },
    addContainer: {
      marginTop: 10,
      width: 30,
      height: 30,
      backgroundColor: colors.blue,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    addText: {
      fontSize: 30,
      marginTop: -7,
      color: colors.lightBlue,
    },
    input: {
      paddingLeft: 10,
      marginLeft: 10,
      fontSize: 16,
      flex: 1,
      color: theme === 'dark' ? colors.white : colors.black,
      // backgroundColor: 'red',
    },
  });

export {useStyles};
