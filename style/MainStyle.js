import { StyleSheet } from 'react-native';

const MainStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    carInfoList: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    carInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    carText: {
        flex: 1,
        fontSize: 16,
    },
    qrButton: {
        backgroundColor: '#d9eaff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 10,
    },
    qrButtonText: {
        color: '#007aff',
    },
    registrationButton: {
        backgroundColor: '#cfe8ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 10,
    },
    registrationButtonText: {
        color: '#005bb5',
    },
    sideMenuButton: {
        alignSelf: 'center',
        marginTop: 20,
    },
    sideMenuText: {
        color: '#333',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 8,
        marginRight: 10,
    },
    header: {
        flexDirection: 'column', // 수직 정렬
        marginBottom: 10,
    },
    dateWrapper: {
        flexDirection: 'column', // 수직 정렬
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
        marginBottom: 10,
    },
    dateContainer: {
        flexDirection: 'row', // 수평 정렬
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    queryText: {
        fontSize: 16,
        color: '#000',
        marginRight: 10,
    },
});

export default MainStyles;