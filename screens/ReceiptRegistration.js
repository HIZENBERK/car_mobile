import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import ReceiptRegistrationStyle from '../style/ReceiptRegistrationStyle';

const ReceiptRegistration = () => {
    return (
        <ScrollView
            style={ReceiptRegistrationStyle.container}
            contentContainerStyle={styles.scrollContainer} // 스크롤 컨테이너 스타일 추가
        >
            {/* Header */}
            <View style={ReceiptRegistrationStyle.header}>
                <Text style={ReceiptRegistrationStyle.headerTitle}>영수증 등록</Text>
            </View>

            {/* Image Upload Section */}
            <View style={ReceiptRegistrationStyle.imageContainer}>
                <TouchableOpacity style={ReceiptRegistrationStyle.imageUploadButton}>
                    <Text style={ReceiptRegistrationStyle.imageUploadText}>이미지 업로드</Text>
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={ReceiptRegistrationStyle.inputContainer}>
                <Text>금액</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="금액 입력" />

                <Text>결제방법</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="결제 방법 입력" />

                <Text>지출항목</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="지출 항목 입력" />

                <Text>사용일자</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="사용 일자 입력" />

                <Text>사용자</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="사용자 입력" />

                <Text>사업자번호</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="사업자 번호 입력" />

                <Text>주소</Text>
                <TextInput style={ReceiptRegistrationStyle.input} placeholder="주소 입력" />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={ReceiptRegistrationStyle.submitButton}>
                <Text style={ReceiptRegistrationStyle.submitButtonText}>제출</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 50, // 스크롤을 100만큼 더 아래로 내리기
    },
});

export default ReceiptRegistration;
