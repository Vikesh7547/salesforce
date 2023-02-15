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

import retrieveContact from '@salesforce/apex/CreateOppIdController.retrieveContact';


import ID_FIELD from '@salesforce/schema/Opportunity.Id';
const FIELDS = [
    'Opportunity.Id'
    

];



export default class EmailLwc extends LightningElement {
    toAddress =[];
    ccAddress = [];
    subject = "";
    body = "";
    @track files = [];

  
@track records;
    @api rec2Id;

    @api recordId;
    @track oppid;

    rec = {
        WhatId : this.oppid
       
    }

    @wire (retrieveContact, {oppId:'$recordId'})
      wireConRecord({error,data}){
        if(data){
          this.records = data;     
          this.errorMsg = undefined;    
        }else{         
          this.errorMsg = error;
          this.records = undefined;
        }
      }

    handleChangeAction(event){
      this.accountId = event.detail;
      window.console.log('accountId ' + this.accountId);
    }



}
