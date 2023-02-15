import { LightningElement, wire, api} from 'lwc';
import getRecord from '@salesforce/apex/AccountController.getAccounts';

export default class FetchDataFromApex extends LightningElement {
    @api recordId;
    record;

    @wire(getRecord, {recordId: '$recordId'})
    wiredAccount({ error, data }) {
        if (data) {
            this.record = data[0];
            console.log("data is"+data[0]);
            console.log("data1 is"+data);
        } else if (error) {
            console.log('Something went wrong:', error);
        }
    }

    get myName() {
        return this.record?.Name;
    }

    get myIndustry() {
        return this.record?.Industry;
    }

    get myRating() {
        return this.record?.Rating;
    }

    get myWebsite() {
        return this.record?.Website;
    }
}