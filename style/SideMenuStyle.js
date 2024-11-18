// SideMenuStyle.js
import { StyleSheet } from 'react-native';

const SideMenuStyle = StyleSheet.create({
    menuContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0,
        width: '120%', // 화면의 2/3 너비로 조정
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%', // 전체 높이
    },
    menuTitle: {
        fontSize: 14,
        marginVertical: 20,
        textAlign: 'left',
        marginTop: 50, // 위에서 50px 아래로 이동
        paddingLeft: 25, // 오른쪽으로 20px 이동
    },
    userName: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'left',
        marginTop: 0,
        paddingLeft: 25, // 오른쪽으로 20px 이동
    },
    menuItem: {
        marginVertical: 3, // 항목 간격 조정
        paddingLeft: 10, // 오른쪽으로 10px 이동
    },
    separator: {
        height: 3,
        backgroundColor: '#ddd',
        marginVertical: 5, // 항목과 경계선 간의 간격
    },
    itemText: {
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 5, // 오른쪽으로 5px 이동
    }
});

export default SideMenuStyle;