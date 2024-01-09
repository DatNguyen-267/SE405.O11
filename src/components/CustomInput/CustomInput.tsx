import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Controller } from 'react-hook-form'

interface InputType {
  control?: any
  name?: any
  rules?: any
  placeholder?: any
  secureTextEntry?: any
  styleInput?: any
  keyboardType?: any
  setValue?: any
}

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  styleInput,
  keyboardType,
  setValue,
}: InputType) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value = '', onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            value={value}
            onChangeText={(e) => {
              onChange(e)
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            style={[styleInput, error && styles.error]}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType ? keyboardType : 'default'}
          />
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'stretch',
                fontSize: 12,
                position: 'absolute',
                bottom: -15,
                right: 0,
              }}
            >
              {error.message || 'Error'}
            </Text>
          )}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
})

export default CustomInput
