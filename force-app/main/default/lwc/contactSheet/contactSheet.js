import { LightningElement, wire, api } from 'lwc';
import getContactList from '@salesforce/apex/ContactList.getContactList';

export default class ContactSheet extends LightningElement {
    @api recordId;
    @wire(getContactList, {accountid: '$recordId'}) contacts;
}