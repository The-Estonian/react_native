import { StyleSheet, Text, View, FlatList } from 'react-native';

import Todo from './Todo';

const TodoNotDoneList = ({ notDoneTodos, removeTodo, switchTodo }) => {
  return (
    <View style={styles.goalList}>
      <Text style={styles.todoTitle}>Not Done To-Do's:</Text>
      <FlatList
        data={[...notDoneTodos].reverse()}
        renderItem={(todo) => {
          return (
            <Todo
              todo={todo}
              removeTodo={removeTodo}
              switchTodo={switchTodo}
            ></Todo>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  goalList: {
    flex: 3,
    alignSelf: 'center',
    marginLeft: 24,
  },
  todoTitle: {
    padding: 16,
    alignSelf: 'center',
  },
});

export default TodoNotDoneList;
