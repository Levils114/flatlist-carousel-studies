import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, StatusBar, StyleSheet, Text, View } from 'react-native';

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;

const images = [
   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
   'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
];

const product = {
   title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
   description: [
       'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
       'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"'
   ],
   price: '29.99£'
};

export default function Courosel(){
   const scrollY = useRef(new Animated.Value(0)).current;

   const [currentIndex, setCurrentIndex] = useState(0);

   function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>){
      Animated.event(
         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
         {  useNativeDriver: true }
      );

      const slideSize = e.nativeEvent.layoutMeasurement.height;
      const index = e.nativeEvent.contentOffset.y / slideSize;
      const roundIndex = Math.round(index);
      setCurrentIndex(roundIndex);
   }

   return(
      <View style={{ flex: 1, }}>
         <StatusBar translucent/>

         <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
            <Animated.FlatList 
               data={images}
               keyExtractor={(_, index) => index.toString()}
               snapToInterval={ITEM_HEIGHT}
               showsVerticalScrollIndicator={false}
               decelerationRate="fast"
               bounces={false}
               onScroll={onScroll}
               renderItem={({ item }) => (
                  <View>
                     <Image source={{ uri: item }} style={styles.image}/>
                  </View>
               )}
            />
         </View>

         <View style={styles.pagination}>
            {images.map((_, index) => (
               <View key={index} style={{ ...styles.dot, backgroundColor: index === currentIndex ? "#333" : "#FFFF" }}/>
            ))}
         </View>

         <BottomSheet 
            snapPoints={[height*0.25, height - 100]}
            index={0}
         >
            <BottomSheetScrollView contentContainerStyle={{ padding: 20, }}>
               <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' }}>{product.title}</Text>
               <Text style={{ fontSize: 16 }}>{product.price}</Text>

               <View style={{ marginVertical: 20, }}>
                  {product.description.map((text, index) => (
                     <Text key={index} style={{ marginBottom: 10, lineHeight: 22, }}>{text}</Text>
                  ))}
               </View>
            </BottomSheetScrollView>
         </BottomSheet>
      </View>
   );
}

const styles = StyleSheet.create({
   image: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      resizeMode: 'cover',
   },
   pagination: {
      position: "absolute",
      top: ITEM_HEIGHT/2,
      left: 20,
   },
   dot: {
      width: 8,
      height: 8,
      borderRadius: 8,
      marginBottom: 8,
   },
});