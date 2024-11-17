import React from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import makeExcelStyle from '../style/MakeExcelStyle';
const MakeExcel = () => {
    const data = [
        { id: '1', name: '134가 1234', details: '차량운행기록부 생성' },
        // 필요한 데이터를 더 추가
    ];

    return (
        <View style={makeExcelStyle.container}>
            {/* 헤더 */}
            <View style={makeExcelStyle.header}>
                <Text style={makeExcelStyle.title}>[번호] 134가 1234</Text>
                <TouchableOpacity style={makeExcelStyle.downloadIcon}>
                    <Text>⬇️ 다운로드</Text>
                </TouchableOpacity>
            </View>

            {/* 검색 바 */}
            <View style={makeExcelStyle.searchBar}>
                <TextInput style={makeExcelStyle.input} placeholder="조회기간" />
                <Button title="선택 생성" onPress={() => {}} />
            </View>

            {/* 항목 리스트 */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={makeExcelStyle.item}>
                        <Text>{item.name}</Text>
                        <Button title={item.details} onPress={() => {}} />
                    </TouchableOpacity>
                )}
            />

            {/* 푸터 */}
            <View style={makeExcelStyle.footer}>
                <Button title="차량검색" onPress={() => {}} />
            </View>
        </View>
    );
};


export default MakeExcel;
