
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useRef, useMemo, useCallback, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function App() {

  const [currentValue, setCurrentValue] = useState('0')
  const [operation, setOperation] = useState('')
  const calculationSign = ['+', '-', '*', '/']

  const plus = () => {
    if (!calculationSign.includes(operation[operation.length - 1])) {
      setOperation((prev) => prev + "+")
    }
  }

  const minus = () => {
    if (!calculationSign.includes(operation[operation.length - 1])) {
      setOperation((prev) => prev + "-")
    }
  }

  const multi = () => {
    if (operation.length == 0) {
      setOperation((prev) => prev + "0*")
    }
    else if (!calculationSign.includes(operation[operation.length - 1])) {
      setOperation((prev) => prev + "*")
    }
  }

  const division = () => {
    if (operation.length == 0) {
      setOperation((prev) => prev + "0/")
    }
    else if (!calculationSign.includes(operation[operation.length - 1])) {
      setOperation((prev) => prev + "/")
    }
  }

  const percentage = () => {
    setCurrentValue(prev => prev = prev * 0.01)
  }

  const del = () => {
    setOperation(prev => prev = prev.slice(0, -1))
  }


  const cancel = () => {
    setOperation('')
    setCurrentValue('0')
  }

  const handleNumber = (number) => {
    setOperation(prev => prev + number)
  }

  const onOperator = () => {
    if (!calculationSign.includes(operation[operation.length - 1])) {
      setCurrentValue(eval(operation))
    }
  }


  //Bottom Sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);



  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 20 }}>
        <ScrollView style={{ height: 120 }} showsHorizontalScrollIndicator={true}>
          <Text style={{ textAlign: 'right', fontSize: 30, marginHorizontal: 20, fontWeight: '300' }}>{operation}</Text>
        </ScrollView>
        <Text style={{ color: '#000', fontSize: 50, textAlign: 'right', marginHorizontal: 20 }}>
          {parseFloat(currentValue)}
        </Text>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={cancel}>
              <Text style={styles.mod}>C</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={percentage}>
              <Text style={styles.mod}>%</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={del}>
              <Feather name='delete' size={30} color={'#45cee1'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={plus}>
              <Text style={styles.mod}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(7)}>
              <Text style={styles.number}>7</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(8)}>
              <Text style={styles.number}>8</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(9)}>
              <Text style={styles.number}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={minus}>
              <Text style={styles.mod} >-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(4)}>
              <Text style={styles.number}>4</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(5)}>
              <Text style={styles.number}>5</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(6)}>
              <Text style={styles.number}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={multi}>
              <Text style={styles.mod}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(3)}>
              <Text style={styles.number}>3</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(2)}>
              <Text style={styles.number}>2</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(1)}>
              <Text style={styles.number}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={division}>
              <Text style={styles.mod}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name='phone-rotate-landscape' size={40} color={'#45cee1'} />
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(0)}>
              <Text style={styles.number}>0</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('.')}>
              <Text style={styles.number}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.equalButton} onPress={onOperator}>
              <Text style={{ fontSize: 40, color: '#fff' }}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    height: '20%'
  },
  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#dadada',
  },
  mod: {
    fontSize: 35,
    color: '#45cee1',
    fontWeight: '300'
  },
  number: {
    fontSize: 35,
    color: '#000',
    fontWeight: '300'
  },
  equalButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#45cee1',
    borderWidth: 0.5,
    borderColor: '#45cee1',
  }

})
