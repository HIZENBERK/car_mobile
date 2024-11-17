import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SettingStyle from '../style/SettingStyle'; // 스타일 가져오기

const RadioButtonGroup = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={SettingStyle.radioGroup}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={SettingStyle.radioButton}
          onPress={() => onValueChange(option.value)}>
          <View
            style={[
              SettingStyle.outerCircle,
              selectedValue === option.value && SettingStyle.selectedOuterCircle,
            ]}>
            {selectedValue === option.value && <View style={SettingStyle.innerCircle} />}
          </View>
          <Text style={SettingStyle.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButtonGroup;
