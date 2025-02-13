import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Todo = ({ todo, removeTodo, switchTodo }) => {
  const deleteHandler = (id) => (e) => {
    e.stopPropagation();
    removeTodo(id);
  };

  // const switchHandler = (id) => () => {
  //   switchTodo(id);
  // };
  return (
    <TouchableOpacity onPress={switchTodo.bind(this, todo.item.id)}>
      <View style={styles.eachTodo}>
        <Text style={styles.todoContent}>{todo.item.data}</Text>
        <TouchableOpacity
          onLongPress={deleteHandler(todo.item.id)}
          style={styles.removeTodo}
        >
          <Text style={styles.removeTodoText}>delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default Todo;
