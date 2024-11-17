import { StyleSheet } from 'react-native';

const MyUseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchPeriod: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 5,
        width: '48%',
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    id: {
        width: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    carInfo: {
        flex: 1,
        paddingLeft: 10,
    },
    carNumber: {
        fontWeight: 'bold',
    },
    time: {
        color: '#888',
    },
    date: {
        width: 80,
        textAlign: 'right',
    },
    duration: {
        width: 50,
        textAlign: 'right',
        color: '#444',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 5,
    },
});

export default MyUseStyles;
