import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

function UseMap({ onClose, coord }) {
    const calculateAverageCoordinate = (coords) => {
        const total = coords.reduce(
            (acc, { longitude, latitude }) => {
                acc.longitude += longitude;
                acc.latitude += latitude;
                return acc;
            },
            { longitude: 0, latitude: 0 }
        );
        const count = coords.length;
        return {
            longitude: total.longitude / count,
            latitude: total.latitude / count,
        };
    };

    const initTmap = () => {
        // Tmap 초기화 로직을 직접 적용할 수 없기 때문에, WebView나 다른 방법을 고려해야 합니다.
        // React Native에서는 Tmap API를 사용할 때 WebView를 사용해야 합니다.
        // const avgCoord = calculateAverageCoordinate(coord);
        // 초기화 관련 로직 생략 (Tmap은 WebView에서 실행해야 함)
    };

    useEffect(() => {
        initTmap(coord);
    }, [coord]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={onClose} style={{ padding: 10, backgroundColor: 'grey' }}>
                <Text style={{ color: 'white' }}>닫기</Text>
            </TouchableOpacity>
            {/* WebView 등을 사용하여 Tmap을 렌더링하는 코드를 추가할 수 있습니다. */}
            <View style={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }}>
                {/* 여기에 Tmap을 WebView로 렌더링 */}
            </View>
        </View>
    );
}

export default UseMap;
