import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public newMessageObj: BehaviorSubject<Object> = new BehaviorSubject({})
  constructor(private socket: Socket) {

  }

  setupSocketConnection() {
    console.log("called from chat service...");

    //this.socket.emit('getRoomMessages', '{"message":"Hello there from Angular."}');
    this.socket.on("sendMessage", (data) => {
      console.log("send message response :", data);
      this.newMessageObj.next(data.messageData)
    });
    this.socket.on("getRoomMessages", data => {
      console.log("Service-RES the present room messages are : ", data);
    })
    this.socket.on("messageEdit", (data) => {
      console.log("reply for edit message...", data);
    });
    //debugger
    // this.socket.of("disconnect");

  }
  joinRoom(data) {
    this.socket.emit('join', data);
  }

  public sendMessage(message) {
    this.socket.emit('sendMessage', message);
    let fetchRoomMsgsObj: Object = {
      "roomID": "APNTIDT49As0tm",
      "userID": "MPIDOA5N",
      "isDoctor": true
    }
    this.socket.emit('getRoomMessages', fetchRoomMsgsObj)
  }

  public editMessage(message) {
    this.socket.emit('messageEdit', message);
    let fetchRoomMsgsObj: Object = {
      "roomID": "APNTIDT49As0tm",
      "userID": "MPIDOA5N",
      "isDoctor": true
    }
    this.socket.emit('getRoomMessages', fetchRoomMsgsObj)
  }
  // public getMessages(message)  {
  //  return this.socket.on('getRoomMessages', (message) => {
  //     console.log(message);   
  // });
  // }

  getMessage() {
    let fetchRoomMsgsObj: Object = {
      "roomID": "APNTIDT49As0tm",
      "userID": "MPIDOA5N",
      "isDoctor": true
    }

    this.socket.emit('getRoomMessages', fetchRoomMsgsObj)
    return this.socket.fromEvent("getRoomMessages").pipe(map(data => data));
    // return this.socket
    //   .fromEvent("getRoomMessages")
    //   .pipe(map((data: any) => console.log(data)

    //   ));
  }

  // disconnect() {
  //   this.socket.disconnect();
  //   console.info("Client side disconnect called...");
  // }
  // public getMessages() {
  //   return new Observable((observer:Observer<any>) => {
  //     this.socket.on('getRoomMessages', (message) => {
  //       observer.next(message);
  //       console.log("Race Gurram",message);

  //   });
  //   });
  // }
}
