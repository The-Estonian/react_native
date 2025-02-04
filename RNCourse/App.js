import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { useState } from 'react';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [todos, setTodos] = useState([]);

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

  const removeTodo = (key) => {
    let newTodoList = todos.filter((todo) => {
      console.log(todo);
      return todo.id != key;
    });
    setTodos(newTodoList);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.addGoal}>
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal'
          onChangeText={inputHandler}
          value={userInput}
        />
        <Button title='Add Goal' onPress={addTodo} />
      </View>
      <View style={styles.goalList}>
        <Text style={styles.todoTitle}>Active To-Do's:</Text>
        <FlatList
          data={[...todos].reverse()}
          renderItem={(todo) => {
            return (
              <View style={styles.eachTodo}>
                <Text style={styles.todoContent}>{todo.item.data}</Text>
                <TouchableOpacity
                  onPress={() => removeTodo(todo.item.id)}
                  style={styles.removeTodo}
                >
                  <Text style={styles.removeTodoText}>delete</Text>
                </TouchableOpacity>
              </View>
            );
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
  goalList: {
    flex: 5,
    alignSelf: 'center',
    // marginLeft: 'auto',
    // alignItems: 'center',
    marginLeft: 24,
  },
  eachTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    width: '90%',
    margin: 1,
    backgroundColor: '#5e0acc',
    overflow: 'hidden',
  },
  todoContent: {
    padding: 8,
    color: 'white',
  },
  todoTitle: {
    padding: 16,
    alignSelf: 'center',
  },
  removeTodo: {
    alignSelf: 'stretch',
    width: 50,
    backgroundColor: 'red',
    marginLeft: 'auto',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeTodoText: {
    color: 'white',
  },
});
