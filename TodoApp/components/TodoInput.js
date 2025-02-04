import { StyleSheet, View, Button, TextInput } from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const TodoInput = ({ setTodos }) => {
  const [userInput, setUserInput] = useState('');

  const inputHandler = (e) => {
    setUserInput(e);
  };

  const addTodo = () => {
    if (userInput.length > 0) {
      let newTodo = { id: uuidv4(), data: userInput };
      setTodos((prev) => [...prev, newTodo]);
      setUserInput('');
    }
  };

  return (
    <View style={styles.addGoal}>
      <TextInput
        style={styles.textInput}
        placeholder='Your course goal'
        onChangeText={inputHandler}
        value={userInput}
      />
      <Button title='Add Goal' onPress={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  addGoal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 0,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  inputButton: {
    flex: 1,
  },
});

export default TodoInput;
