import React, { useState } from 'react';
import {View, TextInput, FlatList, TouchableOpacity, Text, Button, Modal} from 'react-native';
import axios from 'axios';
import TmapAddressSearchStyle from '../style/TmapAddressSearchStyle';
const TmapAddressSearch = ({ onSelectAddress, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!query) {return;}
        try {
            const response = await axios.get('https://apis.openapi.sk.com/tmap/pois', {
                params: {
                    version: 1,
                    searchKeyword: query,
                    resCoordType: 'WGS84GEO',
                    reqCoordType: 'WGS84GEO',
                    appKey: 'yKGZvvXxdt98xaMpb1Ftv90nAsgrXvJiNocjtuyd',
                    count: 10,
                },
            });
            console.log(response.data.searchPoiInfo.pois.poi);
            setResults(response.data.searchPoiInfo.pois.poi || []);
        } catch (error) {
            console.error('Tmap API 검색 오류:', error);
        }
    };

    return (
        <View style={TmapAddressSearchStyle.overlay} onPress={onClose}>
            <View style={TmapAddressSearchStyle.container}>
                <Button title="뒤로가기" onPress={onClose} />
                <View style={TmapAddressSearchStyle.searchContainer}>
                    <TextInput
                        style={TmapAddressSearchStyle.textInput}
                        placeholder="주소를 입력하세요"
                        value={query}
                        onChangeText={(text) => {
                            setQuery(text);
                            handleSearch();
                        }}
                    />
                    <TouchableOpacity style={TmapAddressSearchStyle.currentLocationButton}>
                        <Text style={TmapAddressSearchStyle.currentLocationText}>현재위치</Text>
                    </TouchableOpacity>
                </View>
                {/*<View style={{ flex: 1, maxHeight: '400px' }}> /!* 10개 정도의 높이 유지 *!/*/}
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={TmapAddressSearchStyle.resultItem} onPress={() => onSelectAddress(item.name)}>
                                <Text style={TmapAddressSearchStyle.resultName}>{item.name}</Text>
                                <Text style={TmapAddressSearchStyle.resultAddress}>{`${item.upperAddrName} ${item.middleAddrName} ${item.lowerAddrName}`}</Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={TmapAddressSearchStyle.emptyMessage}>검색 결과가 없습니다.</Text>}
                    />
                {/*</View>*/}
            </View>
        </View>
    );
};

export default TmapAddressSearch;
