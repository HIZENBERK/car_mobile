
import { StyleSheet } from 'react-native';


const MainStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
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
        justifyContent:'bottom',
    },
    sideMenuText: {
        color: '#333',
        justifyContent: 'bottom',
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
    sidebar: {
        flex: 1,
        backgroundColor: '#e6e6e6',
        padding: 16,
    },
    sidebarText: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default MainStyles;
