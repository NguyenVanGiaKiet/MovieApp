import { StyleSheet, Text, View ,Image, Dimensions,Button,Alert} from 'react-native'
import React from 'react'

const {width} = Dimensions.get('screen');

const PhimRong = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.image} />
      <View style={styles.buttonHeader}>
      <Button
        title="Phim Thịnh Hành"
        onPress={() => Alert.alert('Bạn đã bấm nút!')}
        color="#841584"  // Tùy chọn màu sắc cho nút
      />
      <Button
        title="Phim Cũ"
        onPress={() => Alert.alert('Bạn đã bấm nút!')}
        color="#841584"  // Tùy chọn màu sắc cho nút
      />
      </View>
      <View style={styles.buttonFooter}>
      <Button
        title="Phim Thịnh Hành"
        onPress={() => Alert.alert('Bạn đã bấm nút!')}
        color="#841584"  // Tùy chọn màu sắc cho nút
      />
      <Button
        title="Phim Cũ"
        onPress={() => Alert.alert('Bạn đã bấm nút!')}
        color="#841584"  // Tùy chọn màu sắc cho nút
      />
      </View>
    </View>
  )
}

export default PhimRong

const styles = StyleSheet.create({
  container: {
    height: width,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    width: 170,
    height: 30,
    marginTop: 50,
  },
  buttonHeader: {
    position: 'absolute',
    top: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 130,
  },
  buttonFooter: {
    
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
  }
})