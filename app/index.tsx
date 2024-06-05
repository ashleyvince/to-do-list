import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={[styles.todoItem, item.completed && styles.completed]}>
        <Text style={styles.todoText}>{item.text}</Text>
      </TouchableOpacity>
      <Button title="Delete" onPress={() => deleteTodo(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TO-DO-LIST</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Add a New List"
      />
    <TouchableOpacity style={styles.button} onPress={addTodo}>
      <Text style={styles.buttonText}>Add List</Text>
    </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 30,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    color: 'black',
    backgroundColor: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 12,
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: '80%',
    marginTop: 20,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoItem: {
    flex: 1,
    padding: 10,
  },
  todoText: {
    fontSize: 18,
  },
  completed: {
    backgroundColor: '#d3ffd3',
    margin: 5,
    borderRadius: 5,
  },
});
