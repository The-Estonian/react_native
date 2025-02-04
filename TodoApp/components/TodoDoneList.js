import { StyleSheet, Text, View, FlatList } from 'react-native';

import Todo from './Todo';

const TodoDoneList = ({ doneTodos, removeTodo, switchTodo }) => {
  return (
    <View style={styles.goalList}>
      <Text style={styles.todoTitle}>Done To-Do's:</Text>
      <FlatList
        data={[...doneTodos].reverse()}
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

export default TodoDoneList;
