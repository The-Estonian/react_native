import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TodoInput from './components/TodoInput';
import TodoNotDoneList from './components/TodoNotDoneList';
import TodoDoneList from './components/TodoDoneList';

export default function App() {
  const [showInput, setShowInput] = useState(false);
  const [notDoneTodos, setNotDoneTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  useEffect(() => {
    const loadDoneTodos = async () => {
      const storedNotDone = await AsyncStorage.getItem('notDoneTodos');
      if (storedNotDone) setNotDoneTodos(JSON.parse(storedNotDone));
    };
    const loadNotDoneTodos = async () => {
      const storedDone = await AsyncStorage.getItem('doneTodos');
      if (storedDone) setDoneTodos(JSON.parse(storedDone));
    };
    loadDoneTodos();
    loadNotDoneTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('notDoneTodos', JSON.stringify(notDoneTodos));
  }, [notDoneTodos]);

  useEffect(() => {
    AsyncStorage.setItem('doneTodos', JSON.stringify(doneTodos));
  }, [doneTodos]);

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
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <TodoInput
          showInput={showInput}
          setNotDoneTodos={setNotDoneTodos}
          switchInput={switchInput}
        />
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
    </>
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
