public class contenVersionFilePreview {
    @AuraEnabled(cacheable = true)
    public Static  List<ContentVersion> cvRecords2(String recId){
        set<Id> SetIds = new Set<id>();
        list<Account> lstAccount = [Select Id,(Select Id From Contacts),(Select Id From Opportunities) from Account where Id = :recId];
        for(Account Acc : lstAccount){
            SetIds.add(Acc.Id);
            for(Contact con : Acc.Contacts){
            SetIds.add(con.Id);
        	}
            for(Opportunity opp : Acc.Opportunities){
            SetIds.add(opp.Id);
        	}
        }
           List<ContentDocumentLink> files = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :SetIds];
            List<ID> fileIDs = new List<ID>();
            for (ContentDocumentLink docLink : files) {
                fileIDs.add(docLink.ContentDocumentId);
            }
            List<ContentVersion> docs = [SELECT Id,ContentDocumentId, FileExtension, Title 
                						 FROM ContentVersion WHERE ContentDocumentId IN :fileIDs];
          
            return docs;
    }
}