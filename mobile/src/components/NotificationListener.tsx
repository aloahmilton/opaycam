import { useEffect } from 'react';
import { usePubNub } from 'pubnub-react';
import { Alert } from 'react-native';

export const NotificationListener = () => {
    const pubnub = usePubNub();

    useEffect(() => {
        // Subscribe to user's notification channel
        const channels = ['notifications-user-123']; // Replace with actual user ID
        pubnub.subscribe({ channels });

        // Add listener for messages
        const listener = {
            message: (event: any) => {
                console.log('Received notification:', event);

                // Show alert for demo purposes
                Alert.alert(
                    event.message.title || 'Notification',
                    event.message.body || 'You have a new notification'
                );
            },
        };

        pubnub.addListener(listener);

        // Cleanup on unmount
        return () => {
            pubnub.removeListener(listener);
            pubnub.unsubscribe({ channels });
        };
    }, [pubnub]);

    return null; // This is a non-visual component
};
