public class DogPictureCallout {
    @AuraEnabled
    public static String getDogPicture(){
          Http http = new Http();
          HttpRequest req = new HttpRequest();
          req.setEndpoint('callout:DogPictureApi');
          req.setMethod('GET');
          HttpResponse resp = http.send(req);
          return resp.getBody();
     }
  }	