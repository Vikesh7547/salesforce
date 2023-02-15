
import sendEmailController from "@salesforce/apex/EmailClass.sendEmailController";
import fetchAcc from "@salesforce/apex/AccRelatedConC.fetchAcc";
import fetchAccount from "@salesforce/apex/AccountRelatedObj.fetchAccount";
import fetchContact from "@salesforce/apex/AccountRelatedObj.getContacts";
import { LightningElement, wire, track, api } from "lwc";
import getAccounts from "@salesforce/apex/accList.getAccounts";
import { refreshApex } from "@salesforce/apex";
import { getRecord } from "lightning/uiRecordApi";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import { CloseActionScreenEvent } from "lightning/actions";
import LightningAlert from "lightning/alert";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import sendEmail from "@salesforce/apex/EmailHandler.sendEmail";
import { getRecords } from 'lightning/flowSupport';
import CONTACT_NAME from "@salesforce/schema/Account.Name";
 


const FIELDS = [
    'Contact.Name',
    'Contact.Title',
    'Contact.Phone',
    'Contact.Email',
];



export default class EmailLwc extends LightningElement {
    toAddress =[];
    ccAddress = [];
    subject = "";
    body = "";
    @track files = [];
   


    wantToUploadFile = false;
    noEmailError = false;
    invalidEmails = false;
   
    @track open = false;
    @api rec2Id;
    @api getRecords

    @api recordId;
    @api outputTest;
    @api last_name;
    @api objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;
@track isShowModal = false;
@track currenObjectName;
    @track currenRecordId;




 get email() {
        this.toAddress =this.contact.data.fields.Email.value;
        console.log("inside data  email content1"+this.contact.data.fields.Email.value);
        return this.contact.data.fields.Email.value;
    }
    

  
    
    
    

    reloadList() {
        return refreshApex(this.Accounts);
    }

    toggleFileUpload() {
        this.wantToUploadFile = !this.wantToUploadFile;
    }

    

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.files = [...this.files, ...uploadedFiles];
        this.wantToUploadFile = false;
    }

    handleRemove(event) {
        const index = event.target.dataset.index;
        this.files.splice(index, 1);
    }

   
    
    
    handleToAddressChange(event) {
       
        
       
        this.toAddress =event.currentTarget.value;
        
        console.log("handle to adddres"+this.toAddress);
    }
   
        
    handleCcAddressChange(event) {
        this.ccAddress = event.detail.selectedValues;
        console.log("inside ccaddress new"+this.ccAddress);
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleBodyChange(event) {
        this.body = event.target.value;
    }

    validateEmails(emailAddressList) {
        let areEmailsValid;
        if(emailAddressList.length > 1) {
            areEmailsValid = emailAddressList.reduce((accumulator, next) => {
                const isValid = this.validateEmail(next);
                return accumulator && isValid;
            });
        }
        else if(emailAddressList.length > 0) {
            areEmailsValid = this.validateEmail(emailAddressList[0]);
        }
        return areEmailsValid;
    }

    validateEmail(email) {
        console.log("In VE");
        const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()s[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("res", res);
        return res.test(String(email).toLowerCase());
    }

     
    handleReset() {
        this.toAddress = [];
        this.ccAddress = [];
        this.subject = "";
        this.body = "";
        this.files = [];
        this.template.querySelectorAll("c-email-input").forEach((input) => input.reset());
    }

    handleSendEmail() {
       
        
        const evt = new ShowToastEvent({
            title: 'Email Alert',
            message: 'Email Sent',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        console.log("inside email handler"+this.toAddress);
        
       
        this.noEmailError = false;
        this.invalidEmails = false;
        if (![...this.toAddress, ...this.ccAddress].length > 0) {
           
            this.noEmailError = true;
            return;
        }
        
        console.log("inside email new"+this.toAddress);
       

       
        console.log("inside email2"+this.toAddress);
        let emailDetails = {
           
           
            toAddress: this.toAddress,
            ccAddress: this.ccAddress,
            subject: this.subject,
            body: this.body
        };
        
        sendEmail({ toAddress: this.toAddress,ccAddress: this.ccAddress, subject: this.subject,body: this.body});
      
        console.log("Email Sent");
        
       
           
           
    }
}