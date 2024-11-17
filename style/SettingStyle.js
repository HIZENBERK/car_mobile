import { StyleSheet } from 'react-native';

const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  // 새로운 버튼 스타일
  fullWidthButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#007aff',
    borderRadius: 8,
    width: '100%', // 화면 가로 전체 버튼
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
  },
  radioGroup: {
    flexDirection: 'row', // 라디오 버튼과 텍스트가 수평으로 정렬되도록 설정
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between', // 버튼과 라벨 사이의 간격 조정
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuterCircle: {
    borderColor: '#007aff',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007aff',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  inputField: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  // 시간 및 화면 고정 항목의 오른쪽 배치
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  // 확인 버튼 스타일
  confirmButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007aff',
    borderRadius: 8,
    width: '100%', // 화면 가로 전체 버튼
    justifyContent: 'center',
    alignItems: 'center',
    // 높이를 설정하여 클릭 영역을 정확히 지정
    height: 50,
  },
});

export default SettingStyle;
