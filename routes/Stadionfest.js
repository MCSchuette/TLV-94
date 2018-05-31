var express = require('express');
var router = express.Router();


// -------------------------------------------------------------------------
//			Landing Page with 3 Kampf Default
// -------------------------------------------------------------------------
router.get('/', function(req, res) {
  console.log("Got Request");
  var db = req.app.get('db');
  var registratedUsers = db.get('registratedUsers2018');
  console.log("Looking for Users in db: " + db);
  registratedUsers.find({},{}, function(e,docs){
    console.log("Found Users")
    res.render('Stadionfest', {"registratedUsers" : docs, selected: '3_Kampf'});
  });
});

// -------------------------------------------------------------------------
//			Open new Discipline
// -------------------------------------------------------------------------
router.post('/switchSelection', function(req, res) {
  var db = req.app.get('db');
var registratedUsers = db.get('registratedUsers2017');
registratedUsers.find({},{}, function(e,docs){
  switch(req.param('Selection')) {
  //case 'Paarzeitfahren':
    //res.render('Stadionfest', { selected: 'Paarzeitfahren',"registratedUsers" : docs });
    //break;
  case '3_Kampf':
    res.render('Stadionfest', { selected: '3_Kampf',"registratedUsers" : docs });
    break;
  case 'Staffel':
    res.render('Stadionfest', { selected: 'Staffel',"registratedUsers" : docs });
    break;
  case 'Paarzeitlauf':
    res.render('Stadionfest', { selected: 'Paarzeitlauf',"registratedUsers" : docs });
    break;
  case 'Volleyball':
    res.render('Stadionfest', { selected: 'Volleyball',"registratedUsers" : docs });
    break; 
  }
});
});

// -------------------------------------------------------------------------
//			Securely reloading discipline
// -------------------------------------------------------------------------
router.get('/switchSelection', function(req,res){
var db = req.app.get('db');
var registratedUsers = db.get('registratedUsers2017');
registratedUsers.find({},{}, function(e,docs){
  switch(req.param('Selection')) {
  //case 'Paarzeitfahren':
    //res.render('Stadionfest', { selected: 'Paarzeitfahren',"registratedUsers" : docs });
    //break;
  case '3_Kampf':
    res.render('Stadionfest', { selected: '3_Kampf',"registratedUsers" : docs });
    break;
  case 'Staffel':
    res.render('Stadionfest', { selected: 'Staffel',"registratedUsers" : docs });
    break;
  case 'Paarzeitlauf':
    res.render('Stadionfest', { selected: 'Paarzeitlauf',"registratedUsers" : docs });
    break;
  case 'Volleyball':
    res.render('Stadionfest', { selected: 'Volleyball',"registratedUsers" : docs });
    break; 
  }
});
});

// -------------------------------------------------------------------------
//			Adding People to Database
// -------------------------------------------------------------------------
router.post('/addObject', function(req, res){
var db = req.app.get('db');
var registratedUsers = db.get('registratedUsers2017');
var discipline = req.param('RequestForRegistration');
req.pipe(req.busboy);
//Setting routes for disciplines
switch(discipline){
//-------------3-Kampf----------------//
case '3_Kampf':
    req.busboy.on('field',function(fieldname, val){
      req.body[fieldname]= val;
      console.log('Received new Registration');
    });
    req.busboy.on('finish', function(){
	 registratedUsers.insert({
		 "Discipline" : discipline,
		 "Vorname" : req.body['Vorname'],
		 "Name" : req.body['Name'],
		 "Born" : req.body['Born'],
		 "Gender" : req.body['Gender'],
		 "Organisation" : req.body['Organisation'],
		 "Email" : req.body['Email'],
                 "DLV_Sportabzeichen" : req.body['DLV_Sportabzeichen']
		  }, function (err, doc){
		    	  if(err){
		       		res.send("There was a problem adding the information to the database.");
		     	   	}
		      	  else {
		       	 console.log("Adding someone to " + discipline + " was successful");
		    	   }
                     }
          );
    });
    break;
//-------------Staffel----------------//
case 'Staffel':
    req.busboy.on('field',function(fieldname, val){
      req.body[fieldname]= val;
      console.log('Received new Registration');
    });
    req.busboy.on('finish', function(){
	 registratedUsers.insert({
		 "Discipline" : discipline,
		 "FirstRunner" : req.body['FirstRunner'],
                 "FirstRunnerAge" : req.body['FirstRunnerAge'],
		 "SecondRunner" : req.body['SecondRunner'],
                 "SecondRunnerAge" : req.body['SecondRunnerAge'],
		 "ThirdRunner" : req.body['ThirdRunner'],
                 "ThirdRunnerAge" : req.body['ThirdRunnerAge'],
		 "FourthRunner" : req.body['FourthRunner'],
                 "FourthRunnerAge" : req.body['FourthRunnerAge'],
		 "Gender" : req.body['Gender'],
		 "Organisation" : req.body['Organisation'],
		 "Email" : req.body['Email'],
		  }, function (err, doc){
		    	  if(err){
		       		res.send("There was a problem adding the information to the database.");
		     	   	}
		      	  else {
		       	 console.log("Adding someone to " + discipline + " was successful");
		    	   }
                     }
          );
    });
    break;
//-------------Paarzeitlauf----------------//
case 'Paarzeitlauf':
    req.busboy.on('field',function(fieldname, val){
      req.body[fieldname]= val;
      console.log('Received new Registration');
    });
    req.busboy.on('finish', function(){
	 registratedUsers.insert({
		 "Discipline" : discipline,
		 "FirstRunner" : req.body['FirstRunner'],
		 "SecondRunner" : req.body['SecondRunner'],
		 "Age" : parseInt(req.body['FirstRunnerAge']) + parseInt(req.body['SecondRunnerAge']) ,
		 "Gender" : req.body['Gender'],
		 "Organisation" : req.body['Organisation'],
		 "Email" : req.body['Email'],
		  }, function (err, doc){
		    	  if(err){
		       		res.send("There was a problem adding the information to the database.");
		     	   	}
		      	  else {
		       	 console.log("Adding someone to " + discipline + " was successful");
		    	   }
                     }
          );
    });
    break;
//-------------Volleyball----------------//
case 'Volleyball':
    req.busboy.on('field',function(fieldname, val){
      req.body[fieldname]= val;
      console.log('Received new Registration');
    });
    req.busboy.on('finish', function(){
	 registratedUsers.insert({
		 "Discipline" : discipline,
                 "TeamName" : req.body['TeamName'],
		 "FirstPlayer" : req.body['FirstPlayer'],
                 "FirstPlayerAge": req.body['FirstPlayerAge'],
		 "SecondPlayer" : req.body['SecondPlayer'],
                 "SecondPlayerAge": req.body['SecondPlayerAge'],
		 "ThirdPlayer" : req.body['ThirdPlayer'],
                 "ThirdPlayerAge": req.body['ThirdPlayerAge'],
		 "FourthPlayer" : req.body['FourthPlayer'],
                 "FourthPlayerAge": req.body['FourthPlayerAge'],
                 "FifthPlayer" : req.body['FifthPlayer'],
                 "FifthPlayerAge": req.body['FifthPlayerAge'],
                 "SixthPlayer" : req.body['SixthPlayer'],
                 "SixthPlayerAge": req.body['SixthPlayerAge'],
		 "Organisation" : req.body['Organisation'],
		 "Email" : req.body['Email'],
		  }, function (err, doc){
		    	  if(err){
		       		res.send("There was a problem adding the information to the database.");
		     	   	}
		      	  else {
		       	 console.log("Adding someone to " + discipline + " was successful");
		    	   }
                     }
          );
    });
    break;	
}
res.redirect('/switchSelection?Selection=' + discipline);
});

module.exports = router;
