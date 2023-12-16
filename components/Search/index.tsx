import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Platform} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { Colors } from './../../constants/Colors';

interface ProfileCardProps{ 
  search?: any; 
  setSearch?: any; 
}
const SearchInput = ({search, setSearch}: ProfileCardProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <AntDesign name="search1" size={16}/>
        </View>
        <TextInput
          style={[styles.field, isFocused && Platform.OS ==='web' && {outline: 'none'}]}
          placeholder="Search"
          placeholderTextColor={Colors.color_label_200} 
          value={search}
          onChangeText={setSearch}
          onFocus={()=>setIsFocused(true)}
        />
        {/* <View style={styles.filter}>
          <AntDesign name="" onPress={() => {}} />
        </View> */}
      </View>
    </View>
  );
};

export default SearchInput;
