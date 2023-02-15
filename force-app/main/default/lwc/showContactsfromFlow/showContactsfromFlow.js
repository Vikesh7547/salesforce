import { LightningElement,api } from 'lwc';

export default class ShowContactsfromFlow extends LightningElement {
    @api records = [];
    @api recordId;
    @api fieldColumns = [
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName'},
        { label: 'Email', fieldName: 'Email' }
        ];
}