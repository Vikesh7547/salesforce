public with sharing class CreateOppIdController {
    @AuraEnabled(cacheable=true)
    public static List<Account> retrieveAccountRecords(){
        List<Account> accList = [Select Id, Name, Phone, Industry, Description From Account  limit 10];
        return accList;
    }
 
 
    @AuraEnabled(cacheable=true)
    public static List<Task> retrieveContact(string oppId){
        List<Opportunity> oppList = [select id from Opportunity where id=:oppId];
        List<Task> insertTasks = new List<Task>();
        for(Opportunity opp : oppList){
            task t = new task(OwnerId = opp.ownerid,Subject = 'Task1',Status = 'Open',Priority = 'Normal',WhatId = opp.Id);
            insertTasks.add(t);
        }
      insert insertTasks;
      return insertTasks;
    }
}