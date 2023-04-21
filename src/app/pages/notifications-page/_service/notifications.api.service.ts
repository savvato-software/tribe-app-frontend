import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    //Data from MockAPI
    private messagesWithIcons = [];

    constructor() {
        // Call buildMessage() to create an array of notifications with mockData
        this.messagesWithIcons = this.buildMessage();
    }

    getMessages(): Observable<any[]> {

        return of(this.messagesWithIcons);
    }

    deleteMessage(id: number): Observable<any> {
        // Find the index of the message to be deleted
        const index = this.messagesWithIcons.findIndex(message => message.id === id);

        // If the message exists, remove it from the array
        if (index !== -1) {
            this.messagesWithIcons.splice(index, 1);
        }

        // Return an observable with a response of 200 OK
        return of({ status: 200 });
    }

    // Function to build an array of notifications with associated icons (MockAPI)
    private buildMessage() {
        //Messages for notification (MockAPI)
        const notificationMessages = [
            { id: 1, iconId: 1, text: 'Request Review from John' },
            { id: 2, iconId: 2, text: 'Job Started by John' },
            { id: 3, iconId: 4, text: 'Message from John: "What is a div?"' },
            { id: 4, iconId: 3, text: 'Zoom call with John at 8:00pm est' },
            { id: 5, iconId: 4, text: 'Message from John: "Hello, My name is John and I am an expert code writer!"' }
        ];
        //Icons for messages (MockAPI)
        const notificationIcons = [
            { iconId: 1, icon: 'notifications-outline' },
            { iconId: 2, icon: 'mail-outline' },
            { iconId: 3, icon: 'alarm-outline' },
            { iconId: 4, icon: 'chatbubble-outline' },
        ];

        // Loop to combine messages and icons
        const notifications = notificationMessages.map(message => {
            const icon = notificationIcons.find(icon => icon.iconId === message.iconId)?.icon;
            return { ...message, icon };
        });

        return notifications;
        console.log(notifications)
    }
}