// Loginstyles.js
import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 10,
    },
});

export default LoginStyles;
