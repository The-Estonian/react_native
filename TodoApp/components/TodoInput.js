import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  Image,
} from 'react-native';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import img from '../assets/images/goal.png';

const TodoInput = ({ setNotDoneTodos, switchInput, showInput }) => {
  const [userInput, setUserInput] = useState('');

  const inputHandler = (e) => {
    setUserInput(e);
  };

  const addTodo = () => {
    if (userInput.length > 0) {
      let newTodo = { id: uuidv4(), data: userInput };
      setNotDoneTodos((prev) => [...prev, newTodo]);
      setUserInput('');
      switchInput();
    }
  };

  return (
    <Modal visible={showInput} animationType='slide' onPress={switchInput}>
      <View style={styles.addGoal}>
        <Image style={styles.image} source={img} />
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal'
          onChangeText={inputHandler}
          value={userInput}
        />
        <View style={styles.buttons}>
          <Pressable
            onPress={switchInput}
            android_ripple={{ color: 'red' }}
            style={({ pressed }) =>
              pressed ? styles.cancelPressedItem : styles.cancelNotPressedItem
            }
          >
            <Text style={styles.addButton}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={addTodo}
            android_ripple={{ color: 'blue' }}
            style={({ pressed }) =>
              pressed ? styles.addPressedItem : styles.addNotPressedItem
            }
          >
            <Text style={styles.addButton}>Add Goal</Text>
          </Pressable>
        </View>
        {/* <Button title='Add Goal' onPress={addTodo} /> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addGoal: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#cccccc',
    marginTop: 'auto',
    marginBlock: 'auto',
    backgroundColor: '#311b6b',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: 'white',
    borderRadius: 6,
    width: '90%',
    padding: 16,
    marginHorizontal: 'auto',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  addButton: {
    padding: 12,
    color: 'white',
  },
  addPressedItem: {
    marginTop: 16,
    borderColor: '#f38383',
    backgroundColor: '#5e0acc',
  },
  addNotPressedItem: {
    marginTop: 16,
    backgroundColor: '#5e0acc',
  },
  cancelPressedItem: {
    marginTop: 16,
    borderColor: '#f38383',
    backgroundColor: '#f31282',
  },
  cancelNotPressedItem: {
    marginTop: 16,
    backgroundColor: '#f31282',
  },
  image: {
    marginHorizontal: 'auto',
    marginTop: '50%',
    marginBottom: 16,
    width: 100,
    height: 100,
  },
});

export default TodoInput;
