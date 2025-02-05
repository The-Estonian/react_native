import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { useState } from 'react';

import TodoInput from './components/TodoInput';
import TodoNotDoneList from './components/TodoNotDoneList';
import TodoDoneList from './components/TodoDoneList';

export default function App() {
  const [showInput, setShowInput] = useState(false);
  const [notDoneTodos, setNotDoneTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  const removeTodo = (key) => {
    let newTodoList;
    if (notDoneTodos.find((todo) => todo.id === key)) {
      newTodoList = notDoneTodos.filter((todo) => {
        return todo.id != key;
      });
      setNotDoneTodos(newTodoList);
    } else {
      newTodoList = doneTodos.filter((todo) => {
        return todo.id != key;
      });
      setDoneTodos(newTodoList);
    }
  };

  const switchTodo = (key) => {
    let findTodo = notDoneTodos.find((todo) => todo.id === key);
    if (findTodo) {
      removeTodo(findTodo.id);
      setDoneTodos((prev) => [...prev, findTodo]);
    } else {
      findTodo = doneTodos.find((todo) => todo.id === key);
      removeTodo(findTodo.id);
      setNotDoneTodos((prev) => [...prev, findTodo]);
    }
  };

  const switchInput = () => {
    setShowInput(!showInput);
  };

  return (
    <View style={styles.appContainer}>
      {showInput && (
        <TodoInput
          setNotDoneTodos={setNotDoneTodos}
          switchInput={switchInput}
        />
      )}
      {!showInput && (
        <TodoNotDoneList
          switchTodo={switchTodo}
          notDoneTodos={notDoneTodos}
          removeTodo={removeTodo}
        />
      )}
      {!showInput && (
        <TodoDoneList
          switchTodo={switchTodo}
          doneTodos={doneTodos}
          removeTodo={removeTodo}
        />
      )}
      {!showInput && (
        <TouchableOpacity style={styles.inputTrigger} onPress={switchInput}>
          <Text style={styles.inputTriggerText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
  },
  inputTrigger: {
    marginTop: 'auto',
    marginLeft: 'auto',
    padding: 15,
    paddingTop: 0,
    paddingBottom: 3,
    margin: 12,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  inputTriggerText: {
    fontSize: 40,
    color: 'white',
  },
});
