public with sharing class QuickOpportunityController {

    @AuraEnabled
    public static Account getAccount(Id accountId) {
        // Perform isAccessible() checks here
        return [SELECT Name, BillingCity, BillingState FROM Account WHERE Id = :accountId];
    }
    
    @AuraEnabled
    public static Opportunity saveOpportunityWithAccount(Opportunity opportunity, Id accountId) {
        // Perform isAccessible() and isUpdateable() checks here
        opportunity.AccountId = accountId;
        insert opportunity;
        return opportunity;
    }

}