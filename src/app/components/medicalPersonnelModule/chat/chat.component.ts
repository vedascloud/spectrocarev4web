import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { MedicalPersonnelAppointmentsComponent } from '../medical-personnel-appointments/medical-personnel-appointments.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  baseURL: string = "http://34.231.177.197:3000";
  patient: any;
  isValue: any;
  viewGeneralInfo: boolean = false;
  viewPatientInfo: boolean = false;
  viewFiles: boolean = false;
  viewChat: boolean = false;
  oldmessages: any
  message: string = "";
  previousMessage: string = "";
  fetchedMessagesRes: any;
  fetchedMessages: Array<any> = [];
  userID: String;
  isUpdate: boolean = false;
  isIndex: number;
  editmessageData: any;
  @ViewChild('mainScroll', { static: false }) private myScroll: ElementRef
  constructor(private dialogRef: MatDialog, private refData: MatDialogRef<MedicalPersonnelAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private chatService: ChatService, private cd: ChangeDetectorRef) {
    this.chatService.newMessageObj.subscribe((val: any) => {
      if (val && val.messageID) {
        this.fetchedMessages.push(val);
      }
    })
  }

  ngOnInit() {
    //this.chatService.setupSocketConnection()
    console.log("the patient Data is : ", this.data);
    this.patient = this.data;
    this.userID = this.patient.doctorMedicalPersonnelID;
    this.chatService.setupSocketConnection()
    this.join();
    this.chatService.getMessage().subscribe(res => {
      console.log("Component-RES from getRoomMessages ... ", res);
      this.fetchedMessagesRes = res;

      this.fetchedMessages = this.fetchedMessagesRes.room[0].messages;
      this.scrollToBottom();
      //alert(JSON.stringify(this.fetchedMessages))
      //alert(JSON.stringify(res))
    })
    // this.chatService
    // .getMessages().subscribe((message: string) => {
    //   console.log("Room Messages",message);

    // })
  }
  ngAfterViewChecked() {

  }
  scrollToBottom() {
    setTimeout(() => { this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight }, 1)
  }
  join() {
    this.chatService.joinRoom({
      "roomID": "APNTIDT49As0tm",
      "userID": "MPIDOA5N",
    });
  }
  sendChatMessages() {
    if (this.isUpdate === false) {
      console.log(this.message, this.editmessageData);

      let resendEditedMsgObj = {
        roomID: this.data.appointmentDetails.appointmentID,
        isEdited: true,
        message: this.message,
        message1: this.editmessageData.message,
        messageID: this.editmessageData.messageID,
        type: this.editmessageData.type,
        userID: this.editmessageData.userID
      }
      console.log("after edited message data ... ", resendEditedMsgObj);
      this.chatService.editMessage(resendEditedMsgObj);
      this.message = ""
    }
    else {
      let sendMsgObj: any = {
        "roomID": "APNTIDT49As0tm",
        "userID": "MPIDOA5N",
        "message": this.message,
        "message1": this.previousMessage,
        "repliedMessageID": "",
        "audioDuration": "",
        "recipientRepliedName": "",
        "type": "regular"
      }
      this.chatService.sendMessage(sendMsgObj);
      this.previousMessage = this.message;
      this.message = ""
    }
  }

  editMessage(readyToEditMessage) {
    console.info("selected message to edit this message : ", readyToEditMessage);
    this.message = readyToEditMessage.message
    this.editmessageData = readyToEditMessage;
  }
  deleteMessage(readyToDeleteMessage) {
    console.log("delete message data ... ", readyToDeleteMessage);

  }
  openGeneralInfo() {
    this.isValue = 1;
    this.viewGeneralInfo = true;
    this.viewPatientInfo = false;
    this.viewFiles = false;
    this.viewChat = false;
  }
  openPatientInfo() {
    this.isValue = 2;
    this.viewGeneralInfo = false;
    this.viewPatientInfo = true;
    this.viewFiles = false;
    this.viewChat = false;
  }
  openFile() {
    this.isValue = 3;
    this.viewGeneralInfo = false;
    this.viewPatientInfo = false;
    this.viewFiles = true;
    this.viewChat = false;
  }
  openChat() {
    this.isValue = 4;
    this.viewGeneralInfo = false;
    this.viewPatientInfo = false;
    this.viewFiles = false;
    this.viewChat = true;
  }
  closeModel() {
    try {
      // this.chatService.disconnect();
      this.refData.close();
    } catch (e) {
      console.log("err", e);
    }


  }


}
