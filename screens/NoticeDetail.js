import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import NoticeStyle from '../style/NoticeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoticeDetail = () => {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRoute();
  const { noticeId } = route.params;  // URL에서 noticeId 받아오기

  // 날짜 포맷을 'YYYY-MM-DD'로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);  // 월을 2자리로
    const day = (`0${date.getDate()}`).slice(-2);  // 일을 2자리로
    return `${year}-${month}-${day}`;
  };

  // 공지사항 상세 조회 함수
  const fetchNoticeDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('access');  // AsyncStorage에서 토큰 가져오기
      if (!token) {
        Alert.alert('인증 오류', '로그인이 필요합니다.');
        return;
      }

      // axios 요청에 Authorization 헤더 추가
      const response = await axios.get(`https://hizenberk.pythonanywhere.com/api/notices/${noticeId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotice(response.data.notice);
    } catch (err) {
      console.error('공지사항 상세 조회 실패:', err.message);
      setError('공지사항을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticeDetail();
  }, [noticeId]);  // noticeId가 변경되면 다시 조회

  if (loading) {
    return (
      <View style={NoticeStyle.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={NoticeStyle.errorContainer}>
        <Text style={NoticeStyle.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={NoticeStyle.container}>
      {notice && (
        <>
          <Text style={NoticeStyle.noticeDetailTitle}>{notice.title}</Text>
          <Text style={NoticeStyle.noticeDetailDate}>
            {formatDate(notice.created_at)}  {/* 날짜 형식 변경 */}
          </Text>
          <Text style={NoticeStyle.noticeDetailContent}>{notice.content}</Text>
        </>
      )}
    </View>
  );
};

export default NoticeDetail;
