service cloud.firestore {
  match /databases/{database}/documents {
    match /stories/{story} {
      allow read: if true;
      allow delete, update: if false;
      allow create: if request.auth.uid != null &&
      	// request.time < resource.data.time + duration.value(60, 's') &&
      	request.resource.data.title is string &&
      	request.resource.data.content is string &&
      	request.resource.data.createdAt is number &&
      	request.resource.data.postID is number && 
      	request.resource.data.time is timestamp &&
      	// request.resource.data.postID == resource.data.postID + 1 
      	request.resource.data.reactions.laugh.active is bool &&
      	request.resource.data.reactions.laugh.total is number &&
      	request.resource.data.reactions.laugh.total == 0 &&
      	request.resource.data.reactions.laugh.type == "laugh" &&
      	request.resource.data.reactions.shook.active is bool &&
      	request.resource.data.reactions.shook.total is number &&
      	request.resource.data.reactions.shook.total == 0 &&
      	request.resource.data.reactions.shook.type == "shook" &&
      	request.resource.data.reactions.thumb.active is bool &&
      	request.resource.data.reactions.thumb.total is number &&
      	request.resource.data.reactions.thumb.total == 0 &&
      	request.resource.data.reactions.thumb.type == "thumb"
    }
    
    //Macth only log in users. Allow create but no read/del/update
    match /users/{userID} {
    	allow delete: if false;
      allow create, read: if request.auth.uid == userID;
      allow update: if request.auth.uid == userID &&
      	request.resource.data.id == resource.data.id;
    }
    
    //Match only logged in users. Allow update but no read/del/create
    
    match /Ids/{ids} {
    	allow read;
    	allow delete, create: if false;
      allow update: if request.auth.uid != null &&
      	request.resource.data.totalIds is number
      	// request.resource.data.totalIds
        // request.resource.data.totalIds > 0
    }
  }
}