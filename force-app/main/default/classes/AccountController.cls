public without sharing class AccountController {

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(String recordId) {
        return [SELECT Name, Industry, Rating, Website FROM Account WHERE Id = :recordId];
    }
}