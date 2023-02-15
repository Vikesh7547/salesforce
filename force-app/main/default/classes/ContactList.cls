public with sharing class ContactList {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(string accountid) {
        String account = accountid;
        return [
            SELECT Id, Name, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :account
        ];
    }
}