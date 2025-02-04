import { StyleSheet, Text, View, FlatList } from 'react-native';

import { useState } from 'react';

import TodoInput from './components/TodoInput';
import TodoNotDoneList from './components/TodoNotDoneList';
import TodoDoneList from './components/TodoDoneList';

export default function App() {
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

  return (
    <View style={styles.appContainer}>
      <TodoInput setNotDoneTodos={setNotDoneTodos} />
      <TodoNotDoneList
        switchTodo={switchTodo}
        notDoneTodos={notDoneTodos}
        removeTodo={removeTodo}
      />
      <TodoDoneList
        switchTodo={switchTodo}
        doneTodos={doneTodos}
        removeTodo={removeTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
  },
});
