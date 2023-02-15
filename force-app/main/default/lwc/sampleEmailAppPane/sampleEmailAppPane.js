
import {LightningElement, api} from 'lwc';

export default class SampleEmailAppPane extends LightningElement {
    @api messageBody;
    @api subject;
    @api people;
}