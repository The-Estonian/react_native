import { StyleSheet, Text, View, FlatList } from 'react-native';

import { useState } from 'react';

import Todo from './components/Todo';
import TodoInput from './components/TodoInput';

export default function App() {
  const [todos, setTodos] = useState([]);

  const removeTodo = (key) => {
    let newTodoList = todos.filter((todo) => {
      console.log(todo);
      return todo.id != key;
    });
    setTodos(newTodoList);
  };

  return (
    <View style={styles.appContainer}>
      <TodoInput setTodos={setTodos}></TodoInput>
      <View style={styles.goalList}>
        <Text style={styles.todoTitle}>Active To-Do's:</Text>
        <FlatList
          data={[...todos].reverse()}
          renderItem={(todo) => {
            return <Todo todo={todo} removeTodo={removeTodo}></Todo>;
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
  },

  goalList: {
    flex: 5,
    alignSelf: 'center',
    marginLeft: 24,
  },
  todoTitle: {
    padding: 16,
    alignSelf: 'center',
  },
});
