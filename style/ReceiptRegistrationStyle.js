import { StyleSheet } from 'react-native';

const ReceiptRegistrationStyle = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    backButton: { fontSize: 20, marginRight: 10 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    imageContainer: { marginBottom: 20, alignItems: 'center' },
    imageUploadButton: {
        width: 150, height: 150, backgroundColor: '#e0e0e0',
        justifyContent: 'center', alignItems: 'center',
    },
    imageUploadText: { color: '#555' },
    inputContainer: { marginBottom: 20 },
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
        padding: 10, marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF', padding: 15, alignItems: 'center',
        borderRadius: 5,
    },
    submitButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default ReceiptRegistrationStyle;
