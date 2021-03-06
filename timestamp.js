//pass a string as a parameter , and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
//If it does, it returns both the Unix timestamp and the natural language form of that date
//If it does not contain a date or Unix timestamp, it returns null for those properties.

//need to set up jade or handlebars



var express = require('express');


var app = express();

//app.set('view engine', 'html');

//app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.sendFile(process.cwd()+'/views/home.html');
});

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var year, monthNumber, month, day, unix, fullDate;        

app.get('/:date', function(req, res){
    

    
    function isNatural(enteredDate) {
        year = enteredDate.getFullYear();
        monthNumber = enteredDate.getMonth();
        month = monthNames[monthNumber];
        day = enteredDate.getDate();
        unix = enteredDate.getTime();
        fullDate = month + ' ' + day + ', ' + year; 
        
        return { unix: Number(unix.toString().slice(0,-3)), natural: fullDate };
    }
     
    function isUnix(enteredDate) {
        year = enteredDate.getFullYear();
        monthNumber = enteredDate.getMonth();
        month = monthNames[monthNumber];
        day = enteredDate.getDate();
        unix = enteredDate.getTime();
        fullDate = month + ' ' + day + ', ' + year; 
        
        
        return { unix: Number(unix.toString().slice(0,-3)), natural: fullDate };
    }
    
    
    var enteredDateString = new Date(req.params.date);
    var enteredDateNumber = new Date(Number(req.params.date) * 1000);
    
    if (enteredDateString == 'Invalid Date'){
        if (enteredDateNumber == 'Invalid Date'){
            res.end('{"unix":null,"natural":null}');
        }
        else {
            res.end(JSON.stringify(isUnix(enteredDateNumber)));
        }
    }
    else {
        res.end(JSON.stringify(isNatural(enteredDateString)));
    }

});




app.listen(process.env.PORT || 3000, function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});