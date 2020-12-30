import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { MedicalPersonnelAppointmentsComponent } from '../medical-personnel-appointments/medical-personnel-appointments.component';

import { ConnectionService } from 'ng-connection-service';
import { FORMERR } from 'dns';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
//AfterViewChecked
export class ChatComponent implements OnInit, AfterViewInit {
  status = 'ONLINE';
  isConnected = true;
  baseURL: string = "http://34.231.177.197:3000";
  patient: any;
  isValue: any;
  isValue1: any;
  scrollContainer: any;
  viewGeneralInfo: boolean = false;
  viewPatientInfo: boolean = false;
  viewFiles: boolean = false;
  viewChat: boolean = true;
  oldmessages: any
  message: string = "";
  previousMessage: string = "";
  fetchedMessagesRes: any = [];
  fetchedMessages: Array<any> = [];
  userID: String;
  isUpdate: boolean = false;
  isReplyMsg: boolean = false;
  isIndex: number;
  isFetchMsg: boolean = false;
  editmessageData: any;
  replyMessageData: any;
  appointmentID: String;
  getMsgObj: any = {
    "roomID": "",
    "userID": "",
    "isDoctor": true
  }
  sendMessageForm: FormGroup; replyMessageForm: FormGroup;
  isViewVideo: boolean = false;
  patientObj: any;
  patientFamilyHistory: any = [];
  patientFamilyAllergies: any = [];
  moveDiagnosticNotes: boolean = false;
  viewScreeningRecords: boolean = true;
  viewReplyMsg: boolean = false;
  recipientRepliedName: any;
  typingOccured: boolean = false;
  yesTypingByMe: boolean = false;
  previewImg: any;
  arrayBuffer: any;
  viewImgSelection: boolean = false;
  uploadingFiles = [];
  replyImg: any;
  onlineObj: any;
  recentFile: any = '';
  showImg: any;
  messageDelivered: boolean = true;
  messageNotDelivered: boolean = true;
  //sliceSuccResData: any = { "fileID": "1", "currentSlice": "1" };
  @ViewChild('mainScroll', { static: false }) myScroll: ElementRef;
  @ViewChild('items', { static: false }) msgElement: QueryList<any>;

  @ViewChild('fileInput', { static: true }) el: ElementRef;
  constructor(private dialogRef: MatDialog, private refData: MatDialogRef<MedicalPersonnelAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private chatService: ChatService,
    private cd: ChangeDetectorRef, private connectionService: ConnectionService,
    private loginService: LoginService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.chatService.joinRoom({
          "roomID": this.appointmentID,
          "userID": this.userID,
        });
        console.log("online MESSAGE from chat component...", this.status);
        console.log("before re-send msgs data...", this.fetchedMessages);
        for (let i = 0; i <= this.fetchedMessages.length - 1; i++) {
          if (this.fetchedMessages[i].messageNotDelivered === true) {
            let resendMsgObj = {
              "roomID": this.fetchedMessages[i].roomID,
              "userID": this.fetchedMessages[i].userID,
              "messageID": this.fetchedMessages[i].messageID,
              "message": this.fetchedMessages[i].message,
              "message1": this.fetchedMessages[i].message1,
              "repliedMessageID": this.fetchedMessages[i].repliedMessageID,
              "audioDuration": this.fetchedMessages[i].audioDuration,
              "recipientRepliedName": this.fetchedMessages[i].recipientRepliedName,
              "type": this.fetchedMessages[i].type
            }
            this.chatService.sendMessage(resendMsgObj);
          }
        }

        console.log("after re-send msgs data...", this.fetchedMessages);
        console.log("after called send offline TIME messages...");
        //this.chatService.sendMessage(sendMsgObj);
      }
      else {
        this.status = "OFFLINE";
        console.log("offline MESSAGE from chat component...", this.status)
      }
    })
    this.chatService.userConnectedObj.subscribe((val: any) => {
      if (val && val.userID) {
        console.log("userConnectedObj called in chat component...", val);
        this.onlineObj = val.userID;
        this.patient.patient.patientDetails.isOnline = true;
        this.chatService.joinRoom({
          "roomID": this.appointmentID,
          "userID": this.userID,
        });
      }
    });
    this.chatService.userDisconnectedObj.subscribe((val: any) => {
      if (val && val.userID) {
        console.warn("userDisconnectedObj called in chat component...", val);
        this.patient.patient.patientDetails.isOnline = false;
      }
    });
    this.chatService.newMessageObj.subscribe((val: any) => {
      if (val && val.messageID) {
        for (let i = 0; i <= this.fetchedMessages.length - 1; i++) {
          if (this.fetchedMessages[i].messageID === val.messageID) {
            this.fetchedMessages[i].isEdited = val.isEdited,
              this.fetchedMessages[i].isLiked = val.isLiked,
              this.fetchedMessages[i].isRead = val.isRead,
              this.fetchedMessages[i].message = val.message,
              this.fetchedMessages[i].message1 = val.message1,
              this.fetchedMessages[i].messageID = val.messageID,
              this.fetchedMessages[i].recipientRepliedName = val.recipientRepliedName,
              this.fetchedMessages[i].repliedMessageID = val.repliedMessageID,
              this.fetchedMessages[i].timeStamp = val.timeStamp,
              this.fetchedMessages[i].type = val.type,
              this.fetchedMessages[i].userID = val.userID
          }
          else {
            this.fetchedMessages.push(val);
          }
        }
        //this.fetchedMessages.push(val);
        this.scrollToBottom();
      }
    })
    this.chatService.resDeleteMessageForEveryOne.subscribe((val: any) => {
      if (val && val) {
        let deletedMsgData = this.fetchedMessages.filter(msgData => msgData.messageID != val[0]);
        this.fetchedMessages = deletedMsgData;
      }
    });

    this.chatService.editMessageResObj.subscribe((val: any) => {
      this.messageNotDelivered = !true
      this.messageDelivered = false;
      console.log("edited data ... ", val);

      if (val && val.messageID) {
        for (let i = 0; i <= this.fetchedMessages.length - 1; i++) {
          if (val.messageID === this.fetchedMessages[i].messageID) {
            this.fetchedMessages[i].message1 = this.fetchedMessages[i].message;
            this.fetchedMessages[i].message = val.editedMessage;
          }
        }
      }
      this.scrollToBottom();
    });
    this.chatService.typingResObj.subscribe((val: any) => {
      console.log("typing res in component...", val);

      if (val && (val.isTyping === true)) {
        this.typingEvent();
        // setTimeout(() => {
        //   this.typingEvent();
        // }, 2000);
      }
      else {
        setTimeout(() => {
          this.typingOccured = false;
        }, 2000)
      }
    });
    this.chatService.updateChatMessageIsReadObj.subscribe((val: any) => {
      console.log("updateChatMessageIsRead res in component...", val);
      // this.fetchedMessages = [];
      if (val.isDoctor === false) {

        for (let i = 0; i <= this.fetchedMessages.length - 1; i++) {
          if (this.fetchedMessages[i].isRead === false) {
            this.fetchedMessages[i].isRead = true
          }
          else {
            this.fetchedMessages[i].isRead = true
          }
        }
        console.log("updated isRead...", this.fetchedMessages);
      }
      //this.getUpdateChatMessageIsRead()
    });
    this.chatService.sliceUploadFileObj.subscribe((val: any) => {
      console.log("slice upload res in component...", val);
    });
    this.chatService.requestSliceUploadFileObj.subscribe((val: any) => {
      console.log("requestSliceUploadFileObj res in component... ", val);
      //this.sliceSuccResData = val;
      var file1 = this.getFileWithID(val.fileID)
      if (file1 !== null) {
        console.log("current slice...", file1);
        file1.offset = Number(val.currentSlice)
        this.uploadFile(file1);
      }

    });
    this.chatService.endUploadFileObj.subscribe((val: any) => {
      console.log("endUploadFileObj res in component...", val);
      this.viewImgSelection = false;
      this.uploadingFiles = [];
      if (val && val.messageData) {
        this.fetchedMessages.push(val.messageData);
        console.log("after getting succ res...", this.fetchedMessages);
      }
      this.scrollToBottom();
    });
    this.chatService.uploadErrorFileObj.subscribe((val: any) => {
      console.log("uploadErrorFileObj res in component...", val);
    });
  }

  ngOnInit() {
    let optionsData = {
      userID: localStorage.getItem("medicalPersonnelID"),
      userType: 'Doctor'
    }
    this.chatService.Connect(optionsData);

    //this.scrollToBottom();
    this.openChat();
    this.fetchedMessages = []
    //this.chatService.setupSocketConnection()
    console.log("the patient Data is : ", this.data);
    this.patient = this.data;
    this.userID = this.patient.patient.doctorMedicalPersonnelID;
    this.appointmentID = this.patient.patient.appointmentDetails.appointmentID;
    this.getMsgObj.roomID = this.appointmentID;
    this.getMsgObj.userID = this.userID;
    // = {
    //   "roomID": this.appointmentID,
    //   "userID": this.userID,
    //   "isDoctor": true
    // }
    this.chatService.setupSocketConnection()
    this.join();
    this.chatService.getMessage(this.getMsgObj).subscribe(res => {
      // this.fetchedMessages = [];
      this.fetchedMessagesRes = res;
      if (!this.isFetchMsg) {
        this.fetchedMessages = this.fetchedMessagesRes.room[0].messages;
        this.isFetchMsg = true
      }
      // alert(this.fetchedMessages)
      console.log("Component-RES from getRoomMessages ... ", this.fetchedMessages);
      this.scrollToBottom();
      //alert(JSON.stringify(this.fetchedMessages))
      //alert(JSON.stringify(res))
    })
    // this.chatService
    // .getMessages().subscribe((message: string) => {
    //   console.log("Room Messages",message);

    // })
    this.sendMessageForm = this.fb.group({
      typedMessage: [""],
      selectedImg: [""]
    });
    this.replyMessageForm = this.fb.group({
      typedMessage: [""],
      sendedImg: [""]
    });
    this.patientObj = {
      hospital_reg_num: this.patient.signObj.medicalPersonnel.profile.userProfile.hospital_reg_num,
      token: this.patient.signObj.access_token,
      byWhom: "medical personnel",
      byWhomID: this.patient.signObj.medicalPersonnel.profile.userProfile.medical_personnel_id,
      patientID: this.patient.patient.patientID,
      medical_record_id: this.patient.patient.patientDetails.medical_record_id,
    };
    this.getFamilyHistory(this.patientObj);
    this.getFamilyAllergies(this.patientObj);

  }

  fileProgress1(file) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file1 = file;
    if (file && file) {
      reader.readAsDataURL(file1);
      // When file uploads set it to file formcontrol
      reader.onload = () => {

        this.showImg = reader.result
      }
    }
  }

  //Image Upload
  fileProgress(event: any) {
    this.chatService.listenFileUploadEvents();

    this.viewImgSelection = true;

    var text1 = ""; //random text
    var possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 5; i++) {
      text1 += possible1.charAt(Math.floor(Math.random() * possible1.length));
    }
    let d1 = Date.now();
    var text2 = ""; //random text
    var possible2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) {
      text2 += possible2.charAt(Math.floor(Math.random() * possible2.length));
    }
    let d2 = Date.now();
    var chunkSize = 100000;
    let fileName = event.target.files[0].name;
    let file = event.target.files[0];
    this.fileProgress1(file)
    this.recentFile = file;
    // this.previewImg = file;
    // console.log("previewImg ...", this.previewImg);

    console.log("All Chunks", new Uint8Array(file.slice(0, file.size)));


    //let file = new Blob(event.target.files[0]);
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {

      this.previewImg = fileReader.result;
      console.log("previewImg ...", this.previewImg);

      var arrayBuffer = fileReader.result;
      console.log(arrayBuffer);
      console.log("bytes array...", arrayBuffer);
      let sliceUploadObj = {
        id: text1,
        name: fileName,
        offset: 0,
        size: file.size,
        data: arrayBuffer,
        type: "png",
        roomID: this.appointmentID,
        userID: this.userID,
        messageID: "MSG_Web_" + text2,
        messageType: "SingleImage"
      }
      this.uploadingFiles.push(sliceUploadObj);
      this.uploadFile(sliceUploadObj)
    }
  }
  sendFileAsChunk() {

  }
  uploadFile(obj) {
    console.log("obj data in uploadFile function...", obj);
    var chunkSize = 100000;
    let length = obj.data.byteLength;
    let offset = obj.offset * chunkSize;
    console.log('file size..', length);
    console.log('offset...', offset);
    if (offset < length) {
      let thisChunkSize = ((length - offset) > chunkSize) ? chunkSize : (length - offset);
      var originalBytes = obj.data;
      let newData = obj;
      let file = newData.data;
      let slice = file.slice(offset, offset + Math.min(100000, file.byteLength - offset));
      newData.data = slice

      console.log("ready to send slice data to server...", newData);
      this.chatService.sliceUploadEvent(newData);
      this.getUpdateChatMessageIsRead();
      obj.data = originalBytes;
    }
  }
  copy(src) {
    var dst = new ArrayBuffer(src.byteLength);
    new Uint8Array(dst).set(new Uint8Array(src));
    return dst;
  }

  getFileWithID(fileID: any) {
    console.log("getting success response while slice upload case...", fileID);
    for (let i = 0; i <= this.uploadingFiles.length - 1; i++) {
      if (this.uploadingFiles[i].id === fileID) {
        console.log("Matched File ID", fileID);
        return this.uploadingFiles[i];
      }
    }
    return null;
  }

  closeImg() {
    this.viewImgSelection = false;
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.sendMessageForm.get('selectedImg').setValue(null)
  }
  //Img Upload complete here


  isTypingByMe() {
    console.log("text length...", this.sendMessageForm.value.typedMessage.length);
    if (this.sendMessageForm.value.typedMessage.length >= 1) {
      let typingObj = {
        roomID: this.appointmentID, username: this.patient.patient.doctorDetails.profile.userProfile.firstName, isTyping: true
      }
      this.chatService.typingEvent(typingObj);
    }
    else {
      let typingObj = {
        roomID: this.appointmentID, username: this.patient.patient.doctorDetails.profile.userProfile.firstName, isTyping: false
      }
      this.chatService.typingEvent(typingObj);
    }
  }
  typingEvent() {
    this.typingOccured = true;
    // let typingObj = {
    //   roomID: this.appointmentID, username: this.patient.patient.doctorDetails.profile.userProfile.firstName, isTyping: true
    // }
    // this.chatService.typingEvent(typingObj);
  }
  getFamilyHistory(obj) {
    this.loginService.getPatientFamilyHistoryData(obj).subscribe(
      (res) => {
        console.log("res from rou", res);
        if (res.response === 3) {
          console.log("the family history res : ", res);
          this.patientFamilyHistory = res.records.famliyDiseases;
        } else if (res.response === 0) {
          this.patientFamilyHistory = [];
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client Side Error");
        } else {
          console.log(err);
        }
      }
    );
  }
  //Fetch Patient Allergie
  getFamilyAllergies(obj) {
    this.loginService.getPatientAllergiesData(obj).subscribe(
      (res) => {
        console.log("res from fetch patient allergies : ", res);
        if (res.response === 3) {
          console.log("the family allergies : ", res);
          this.patientFamilyAllergies = res.records.allergies;
        } else if (res.response === 0) {
          this.patientFamilyAllergies = [];
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client Side Error");
        } else {
          console.log(err);
        }
      }
    );
  }
  openVideoCall() {
    this.isViewVideo = true;
  }
  // scrollToBottom() {
  //   setTimeout(() => { this.myScroll.nativeElement.scrollTop = this.myScroll.nativeElement.scrollHeight }, 1)
  // }
  testBoolean(value): boolean {
    return value;
  }
  ngAfterViewInit() {
    this.scrollContainer = this.myScroll.nativeElement;

    this.msgElement.changes.subscribe(() => {
      this.scrollToBottom()
    })

  }
  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  scrollToBottom(): void {
    // this.scrollContainer.scroll({
    //   top: this.scrollContainer.scrollHeight,
    //   left: 0,
    //   behaviour: "smooth"
    // })
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight
    this.getUpdateChatMessageIsRead();
  }
  join() {
    this.chatService.joinRoom({
      "roomID": this.appointmentID,
      "userID": this.userID,
    });

    this.getRoomMsg();
    //after join , call getRoomMessages
  }
  getRoomMsg() {
    if (!this.isFetchMsg) {
      this.chatService.getMessage(this.getMsgObj);
      // this.scrollToBottom();
      setTimeout(() => {
        this.scrollToBottom()
      }, 2000);
    }
  }
  sendChatMessages() {
    //Edit Message
    if (this.isUpdate !== false) {
      console.log(this.message, this.editmessageData);

      let resendEditedMsgObj = {
        roomID: this.data.patient.appointmentDetails.appointmentID,
        isEdited: true,
        message: this.sendMessageForm.value.typedMessage,
        message1: this.editmessageData.message,
        messageID: this.editmessageData.messageID,
        type: this.editmessageData.type,
        userID: this.editmessageData.userID
      }
      console.log("after edited message data ... ", resendEditedMsgObj);
      this.chatService.editMessage(resendEditedMsgObj);
      this.sendMessageForm.reset();
      this.message = ""
      console.log("Before update the array-index data...", this.fetchedMessages[this.isIndex]);
      //this.fetchedMessages.splice(this.isIndex, 1, resendEditedMsgObj);
      console.log("After updated the array-index data ...", this.fetchedMessages[this.isIndex]);
      this.isUpdate = false;
    }
    //Reply Message
    else if (this.isReplyMsg !== false) {
      var messageID = "";
      var possible11 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 8; i++) {
        messageID += possible11.charAt(Math.floor(Math.random() * possible11.length));
      }
      if (this.userID === this.replyMessageData.userID) {
        this.recipientRepliedName = this.patient.patient.doctorDetails.profile.userProfile.firstName
      }
      else {
        this.recipientRepliedName = this.patient.patient.patientDetails.firstName
      }
      if (this.replyMessageData && this.replyMessageData.attachments && this.replyMessageData.attachments.length) {
        let replyMsgObj: any = {
          "roomID": this.appointmentID,
          "userID": this.userID,
          "messageID": 'MSG_Web_' + messageID,
          "message": this.sendMessageForm.value.typedMessage,
          "message1": this.replyImg,
          "repliedMessageID": this.replyMessageData.messageID,
          "audioDuration": "",
          "recipientRepliedName": this.recipientRepliedName,
          "type": "reply"
        }
        console.log("reply msg data...", replyMsgObj);
        //this.chatService.editMessage(replyMsgObj);
        this.chatService.sendMessage(replyMsgObj);

        //this.fetchedMessages.splice(this.isIndex, 1, replyMsgObj);

        //this.previousMessage = this.replyMessageForm.value.typedMessage;
        this.replyMessageForm.reset();
        this.sendMessageForm.reset();
        this.message = ""
        this.replyImg = []
        this.isReplyMsg = false;
        this.closeReply();
      }
      else {
        let replyMsgObj: any = {
          "roomID": this.appointmentID,
          "userID": this.userID,
          "messageID": 'MSG_Web_' + messageID,
          "message": this.sendMessageForm.value.typedMessage,
          "message1": this.replyMessageData.message,
          "repliedMessageID": this.replyMessageData.messageID,
          "audioDuration": "",
          "recipientRepliedName": this.recipientRepliedName,
          "type": "reply"
        }
        console.log("reply msg data...", replyMsgObj);
        //this.chatService.editMessage(replyMsgObj);
        this.chatService.sendMessage(replyMsgObj);

        //this.fetchedMessages.splice(this.isIndex, 1, replyMsgObj);

        //this.previousMessage = this.replyMessageForm.value.typedMessage;
        this.replyMessageForm.reset();
        this.sendMessageForm.reset();
        this.message = ""
        this.isReplyMsg = false;
        this.closeReply();
      }

    }
    //Sending Message
    else {
      var messageID = "";
      var possible11 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 8; i++) {
        messageID += possible11.charAt(Math.floor(Math.random() * possible11.length));
      }
      let sendMsgObj: any = {
        "roomID": this.appointmentID,
        "userID": this.userID,
        "messageID": 'MSG_Web_' + messageID,
        "message": this.sendMessageForm.value.typedMessage,
        "message1": this.previousMessage,
        "repliedMessageID": "",
        "audioDuration": "",
        "recipientRepliedName": "",
        "type": "regular"
      }
      if (this.status === 'OFFLINE') {
        this.fetchedMessages.push(
          {
            "messageNotDelivered": true,
            "isEdited": false,
            "isLiked": false,
            "isRead": false,
            "message": sendMsgObj.message,
            "message1": sendMsgObj.message1,
            "messageID": sendMsgObj.messageID,
            "recipientRepliedName": "",
            "repliedMessageID": "",
            "timeStamp": "" + Date.now(),
            "type": "offline",
            "userID": sendMsgObj.userID
          }
        );
        console.log("Offline time messages data...", this.fetchedMessages);
      }
      this.chatService.sendMessage(sendMsgObj);
      this.previousMessage = this.sendMessageForm.value.typedMessage;
      this.sendMessageForm.reset();
      this.message = ""
      // this.fetchedMessages.push(this.chatService.sendedResponseData);
    }

    let typingObj = {
      roomID: this.appointmentID,
      username: this.patient.patient.doctorDetails.profile.userProfile.firstName,
      isTyping: false
    }
    this.chatService.typingEvent(typingObj);
    this.getUpdateChatMessageIsRead();
  }

  editMessage(readyToEditMessage, index) {
    this.isUpdate = true;
    console.info("selected message to edit this message : ", readyToEditMessage, index);
    this.isIndex = index;
    this.sendMessageForm.patchValue({
      typedMessage: readyToEditMessage.message,
    })
    //this.sendMessageForm.value.typedMessage = readyToEditMessage.message
    //this.message = readyToEditMessage.message
    this.editmessageData = readyToEditMessage;
  }
  replyMessage(message, index) {
    console.log("ready to reply msg data ...", message);
    if (message && message.attachments && message.attachments.length) {
      this.replyImg = this.baseURL + message.attachments[0].filePath;
      this.isReplyMsg = true;
      this.viewReplyMsg = true;
      this.replyMessageForm.patchValue({
        typedMessage: message.message,
        sendedImg: this.baseURL + message.attachments[0].filePath
      })
      this.replyMessageData = message;
    }
    else {
      //this.replyImg = this.baseURL + message.attachments[0].filePath;
      this.isReplyMsg = true;
      this.viewReplyMsg = true;
      this.replyMessageForm.patchValue({
        typedMessage: message.message,
        //sendedImg: this.baseURL + message.attachments[0].filePath
      })
      this.replyMessageData = message;
    }
  }
  closeReply() {
    this.viewReplyMsg = false;
    this.replyImg = [];
  }
  deleteMessage(readyToDeleteMessage, index) {
    console.log("delete message data ... ", readyToDeleteMessage, index);
    let msgArray: any[] = []
    msgArray.push(readyToDeleteMessage.messageID)
    console.log("array of msd-IDs : ", msgArray);

    let deleteMsgForEveryOne = {
      roomID: this.patient.patient.appointmentDetails.appointmentID,
      messageIDs: msgArray
    }
    console.log("delete this msg data ...", deleteMsgForEveryOne);
    this.chatService.deleteMessageForEveryOne(deleteMsgForEveryOne);
    //this.fetchedMessages.splice(index, 1)
  }
  deleteForMeMessage(readyToDeleteMessage, index) {
    console.log("delete for me message data ... ", readyToDeleteMessage, index);
    let msgArray: any[] = []
    msgArray.push(readyToDeleteMessage.messageID)
    console.log("array of msd-IDs : ", msgArray);

    let deleteMsgForMeObj = {
      roomID: this.patient.patient.appointmentDetails.appointmentID,
      userID: this.userID,
      messageIDs: msgArray
    }
    console.log("delete this msg for me data ...", deleteMsgForMeObj);
    this.chatService.deleteMessageForMe(deleteMsgForMeObj);
    this.fetchedMessages.splice(index, 1)
  }
  getUpdateChatMessageIsRead() {
    let updateChatMessageIsReadObj1 = {
      roomID: this.appointmentID,
      userID: this.userID,
      isDoctor: true
    }
    this.chatService.updateChatMessageIsReadEvent(updateChatMessageIsReadObj1);
  }

  clearMessage() {
    let claerMessageObj = {
      roomID: this.appointmentID,
      userID: this.userID,
    }
    this.chatService.clareMessageEvent(claerMessageObj);
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
  openPatientData() {
    console.log("open patient info...");

    this.moveDiagnosticNotes = false
  }
  openDiagnosticNotes() {
    console.log("open diagnostic notes...");
    this.openScreeningRecords();
    this.isValue1 = 5;
    this.moveDiagnosticNotes = true;
  }
  openScreeningRecords() {
    this.isValue1 = 5;
    this.viewScreeningRecords = true;
  }
  openOthers() {
    this.isValue1 = 6;
    this.viewScreeningRecords = false;
  }
  closeModel() {
    console.log("before SOCKET disconnect...");
    this.chatService.disconnect();
    console.log("after SOCKET disconnect...");
    try {
      this.refData.close();
    } catch (e) {
      console.log("err", e);
    }
  }


}

//For socket file sending 
// https://medium.com/@Mewsse/file-upload-with-socket-io-9d2d1229494