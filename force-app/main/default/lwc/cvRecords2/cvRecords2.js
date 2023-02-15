import { LightningElement,api,wire } from 'lwc';
import cvRecords2 from '@salesforce/apex/contenVersionFilePreview.cvRecords2'
export default class ContentVersionV3 extends LightningElement {
    @api recordId;
    wiredActivities;
    filesList =[];

    @wire(cvRecords2, {recId: '$recordId'})
    wiredclass(value){
        this.wiredActivities = value;
        const { data, error } = value;
        if (data) { 
            console.log(data)
            this.filesList = data;
            console.log('Data========> '+JSON.stringify(this.filesList));
        }
        if(error){ 
            console.log(error);
        } 
    }
}