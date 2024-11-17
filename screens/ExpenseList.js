import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import MainStyle from '../style/MainStyle';
import axios from 'axios';

