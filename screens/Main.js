// Main.js
// Main.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MainStyle from '../style/MainStyle';
import { useNavigation } from '@react-navigation/native';
import UseCar from './UseCar';

const Main = () => {
    const navigation = useNavigation();

    return (
        <View style={MainStyle.container}>
            {/* Car Information List */}
            <View style={MainStyle.carInfoList}>
                {[1, 2, 3].map((item, index) => (
                    <View key={index} style={MainStyle.carInfoItem}>
                        <Text style={MainStyle.carText}>[법인] 123가 1234</Text>
                        {/*<TouchableOpacity style={MainStyle.qrButton}>*/}
                        {/*    /!*<Text style={MainStyle.qrButtonText}>QR 인식</Text>*!/*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            style={MainStyle.registrationButton}
                            onPress={() => navigation.navigate('UseCar')}
                        >
                            <Text style={MainStyle.registrationButtonText}>사용 등록</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Side Menu Button */}
            {/*<TouchableOpacity style={MainStyle.sideMenuButton}>*/}
            {/*    <Text style={MainStyle.sideMenuText}>메뉴 열기</Text>*/}
            {/*</TouchableOpacity>*/}

            {/* Bottom Search Bar */}
            <View style={MainStyle.searchBar}>
                <Button title='-'/>
                <TextInput style={MainStyle.searchInput} placeholder="차량 번호 검색" />
                <Button title="검색" onPress={() => {}} />
            </View>
        </View>
    );
};

export default Main;
