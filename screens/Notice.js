import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoticeStyle from '../style/NoticeStyle';

const Notice = () => {
  const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // 공지사항 정보를 불러오는 함수
  const fetchNotices = async () => {
    try {
      // AsyncStorage에서 access token 가져오기
      const token = await AsyncStorage.getItem('access');
      if (!token) {
        Alert.alert('인증 오류', '로그인이 필요합니다.');
        return;
      }

      // axios 요청에 Authorization 헤더 추가
      const response = await axios.get('https://hizenberk.pythonanywhere.com/api/notices/all/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('서버 응답 데이터:', response.data); // 응답 형식 확인

      // 응답에서 'notices' 배열이 있는지 확인
      if (response.data && response.data.notices) {
        setNotices(response.data.notices); // 공지사항 데이터 설정
      } else {
        setError('공지사항 데이터가 없습니다.');
      }
    } catch (err) {
      console.error('공지사항 불러오기 실패:', err.message);
      setError('공지사항을 불러오지 못했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트될 때 공지사항 정보를 불러오기 위해 호출
  useEffect(() => {
    fetchNotices();
  }, []); // 컴포넌트가 마운트될 때만 실행

  // 로딩 중일 때
  if (loading) {
    return (
      <View style={NoticeStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  // 에러가 있을 때
  if (error) {
    return (
      <View style={NoticeStyle.errorContainer}>
        <Text style={NoticeStyle.errorText}>{error}</Text>
      </View>
    );
  }

  // 공지사항이 정상적으로 로드된 경우
  return (
    <View style={NoticeStyle.container}>


      {/* 공지사항 목록 */}
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()} // id로 고유 key 생성
        renderItem={({ item }) => (
          <View style={NoticeStyle.noticeItem}>
            <Text style={NoticeStyle.noticeTitle}>{item.title}</Text>
            <Text style={NoticeStyle.noticeDate}>작성일: {item.created_at}</Text>
            <Text style={NoticeStyle.noticeAuthor}>작성자: {item.created_by__name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Notice;
