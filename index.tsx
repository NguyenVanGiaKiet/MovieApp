import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from './components/Slider'
import { ImageSlider } from './data/SliderDataPopular'

const Index = () => {
  return (
    <View style={styles.container}>
      <Slider itemList={ImageSlider}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
 
})

export default Index;