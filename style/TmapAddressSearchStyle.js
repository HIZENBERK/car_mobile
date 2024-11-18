import { StyleSheet } from 'react-native';

const TmapAddressSearchStyle = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        maxHeight: '80%', // 모달의 최대 높이 설정
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    currentLocationButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    currentLocationText: {
        color: 'white',
        fontSize: 14,
    },
    resultItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
    },
    resultName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultAddress: {
        fontSize: 14,
        color: '#555',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});

export default TmapAddressSearchStyle;
