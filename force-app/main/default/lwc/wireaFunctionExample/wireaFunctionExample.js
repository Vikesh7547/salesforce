import { LightningElement,wire,track,api } from 'lwc';

import getAccountData from '@salesforce/apex/getAccountRecord.getAccountRecordMethod';

 

export default class WireaFunctionExample extends LightningElement {

    @api recordId;

    @track accountRecord;

    @track error;

 

 

    @wire(getAccountData,{ recordIdAccount: '$recordId'}) 

    accountsData({ error, data }) {

        if (data) {

            //console.log('RecordId is'+recordId);

            this.accountRecord = data;

            this.error = undefined;

        } else if (error) {

            //console.log('Error block');

            this.error = error;

            this.accountRecord = undefined;

        }

    }

}