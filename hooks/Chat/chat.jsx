'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useAuth } from "@context/AuthContext";
import Cookies from 'js-cookie';

export const useFetchMessages = () => {
    const pathname = usePathname();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            const ids = pathname.split('/chat/')[1].split('+');
            const from = ids[0];
            const to = ids[1];

            const requestUrl = `http://localhost:3500/api/chat/history/${from}/${to}`;
            console.log(requestUrl);  
            
            try {
                const token = Cookies.get('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const response = await axios.get(requestUrl, {headers});
                if (response.data.success) {
                    const participantsMap = {};
                    response.data.participants.forEach(participant => {
                        participantsMap[participant._id] = participant;
                    });

                    const modifiedMessages = response.data.messages.map(msg => ({
                        ...msg,
                        self: msg.from === user._id,
                        avatar: participantsMap[msg.from]?.avatar
                    }));
                    setMessages(modifiedMessages);
                    console.log(response.data.messages)
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [pathname]);

    return [messages, loading];
};
