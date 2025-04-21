import { StyleSheet } from 'react-native';

const MakeExcelStyle = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 18 },
    downloadIcon: { padding: 5 },
    input: { flex: 1, borderColor: '#ccc', borderWidth: 1, marginRight: 10, padding: 5 },
    item: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    buttonSpacing: {
        marginLeft: 10, // 버튼 간격 조정
    },
    checkbox: {
        margin: 0,
        width: '10%',
        height: '10%',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10, // 이 부분 추가
    },

    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10, // 이 부분 추가
    },
    dateButton: {
        width: 110, // 원하는 너비로 조정 (예: 100)
        padding: 12,
        backgroundColor: '#e6f7ff',
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
    },
    queryText: {
        fontSize: 12,
        color: '#000',
        marginRight: 10,
    },
});

export default MakeExcelStyle;
