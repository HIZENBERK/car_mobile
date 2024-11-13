import { StyleSheet } from 'react-native';

const UseCarStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    carInfo: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    distance: {
        fontSize: 14,
    },
    inputContainer: {
        marginBottom: 16,
    },
    timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        width: 80,
        textAlign: 'center',
    },
    recordContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    recordTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailsContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    fullWidthButtonContainer: {
        width: '100%',
        alignItems: 'center', // 버튼을 중앙에 위치
    },
    fullWidthButton: {
        width: '95%', // 화면의 90% 차지
        height: 350,
        backgroundColor: '#a3b6f6', // 원하는 색상
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UseCarStyle;
