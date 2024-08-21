import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../components/Context/Context';

const ChatUser = () => {
    const { username } = useContext(UserContext);
    console.log('Username:', username);
    const route = useRoute();
    
    const  targetClientId  = route.params;
    const targetClientIdFinale = targetClientId.user;


    console.log('Target client ID:', targetClientIdFinale);
   
   
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        // Učitaj poruke iz AsyncStorage
        const loadMessages = async () => {
            try {
                const storedMessages = await AsyncStorage.getItem('messages');
                if (storedMessages) {
                    const parsedMessages = JSON.parse(storedMessages);
                    setReceivedMessages(parsedMessages);
                    console.log('Loaded messages:', parsedMessages);
                }
            } catch (error) {
                console.error('Failed to load messages from storage:', error);
            }
        };

        loadMessages();

        // Koristi IP adresu računara umesto 'localhost'
        const ws = new WebSocket('ws://192.168.0.105:8080'); // Zameni sa tvojom IP adresom

        ws.onopen = () => {
            console.log('Connected to WebSocket server' + username);
            ws.send(JSON.stringify({ type: 'setId', clientId: username }));
        };

        ws.onmessage = (event) => {
            console.log('Received:', event.data);
            setReceivedMessages(prevMessages => {
                const newMessages = [...prevMessages, event.data];
                // Sačuvaj poruke u AsyncStorage
                AsyncStorage.setItem('messages', JSON.stringify(newMessages));
                return newMessages;
            });
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error.message);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [username]);

    const sendMessage = () => {
        if (socket && message) {
            const msg = JSON.stringify({
                type: 'message',
                targetClientId: targetClientIdFinale , // Koristi parametar za ciljanog korisnika
                text: message
            });
            console.log('Sending:', msg);
            socket.send(msg);
            setMessage('');
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>WebSocket Chat</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={message}
                    onChangeText={setMessage}
                />
                <Button title="Send Message" onPress={sendMessage} />
                <View style={styles.messages}>
                    {receivedMessages.map((msg, index) => (
                        <Text key={index}>{msg}</Text>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    messages: {
        marginTop: 20,
        width: '100%',
    },
});

export default ChatUser;
