import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

const ReceiptRegistration = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { recordId } = route.params; // 선택한 지출 내역의 ID

    const [selectedFile, setSelectedFile] = useState(null);

    console.log("불러온 지출 내역 정보:", recordId);
    // 파일 선택 함수
    const selectFile = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images], // 이미지 파일만 선택
            });
            setSelectedFile(result[0]); // 선택한 첫 번째 파일
            Alert.alert('파일 선택 완료', `파일 이름: ${result[0].name}`);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('취소됨', '파일 선택이 취소되었습니다.');
            } else {
                console.error('파일 선택 오류:', err);
                Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
            }
        }
    };

    // 영수증 파일 업로드 함수
    const uploadReceipt = async () => {
        if (!selectedFile) {
            Alert.alert('오류', '업로드할 파일을 선택하세요.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('access');
            if (!token) {
                Alert.alert('오류', '로그인 토큰이 없습니다. 다시 로그인해 주세요.');
                navigation.navigate('Login');
                return;
            }

            const formData = new FormData();
            formData.append('receipt_detail', {
                uri: selectedFile.uri,
                name: selectedFile.name,
                type: selectedFile.type,
            });

            const response = await axios.patch(
                `https://hizenberk.pythonanywhere.com/api/expenses/${recordId}/`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert('성공', '영수증이 성공적으로 업로드되었습니다.');
                console.log('업로드된 지출 내역 정보:', response.data);
                navigation.goBack();
            } else {
                Alert.alert('오류', '영수증 업로드에 실패했습니다.');
            }
        } catch (error) {
            if (error.response) {
                console.error('서버 응답 데이터:', error.response.data);
                Alert.alert('오류', `업로드 중 오류 발생: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error('영수증 업로드 오류:', error);
                Alert.alert('오류', '영수증 업로드 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>영수증 업로드</Text>
            <Button title="파일 선택" onPress={selectFile} />
            {selectedFile && (
                <Text style={styles.fileName}>
                    선택된 파일: {selectedFile.name}
                </Text>
            )}
            <Button title="업로드" onPress={uploadReceipt} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    fileName: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
});

export default ReceiptRegistration;
