import { StyleSheet } from 'react-native';

const MakeExcelStyle = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 18 },
    downloadIcon: { padding: 5 },
    searchBar: { flexDirection: 'row', marginVertical: 10 },
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
});

export default MakeExcelStyle;
