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
    smallButton: {
        width: '90%', // 화면의 90% 차지
        height: 50,
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#444',
        marginRight: 10,
    },
    radioCircleSelected: {
        backgroundColor: '#444',
    },
    radioLabel: {
        fontSize: 16,
    },
});

export default UseCarStyle;
