import axios from 'axios';

const calculateDistance = async (lat1, lon1, lat2, lon2) => {
    try {
        const response = await axios.get('https://apis.openapi.sk.com/tmap/routes/distance', {
            params: {
                version: 1,
                startX: lon1,
                startY: lat1,
                endX: lon2,
                endY: lat2,
                resCoordType: 'WGS84GEO',
                format: 'json',
                appKey: 'yKGZvvXxdt98xaMpb1Ftv90nAsgrXvJiNocjtuyd',
            },
        });
        console.log(response.data.distanceInfo.distance);
        const distance = response.data.distanceInfo.distance;
        return distance; // 계산된 거리 반환
    } catch (error) {
        console.error('Tmap 거리 계산 오류:', error);
        throw error; // 호출한 쪽에서 오류 처리 가능하도록 예외 던지기
    }
};

export default calculateDistance;
