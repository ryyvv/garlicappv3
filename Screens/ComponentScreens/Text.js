import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';

const MyComponent = () => {
  const data1 = Array.from({ length: 50 }, (_, index) => ({ id: index, text: `Item ${index + 1}` }));
  const data2 = Array.from({ length: 50 }, (_, index) => ({ id: index, text: `Item ${index + 1}` }));

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.text}</Text>
    </View>
  );

  const datas = () => {
    alert('Button pressed!')
  }

  const renderFloatingButton = () => (
    <TouchableOpacity onPress={datas} style={styles.floatingButton}>
      <Text style={styles.buttonText}>Button</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data1}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
        <FlatList
        data={data2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderFloatingButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyComponent;
