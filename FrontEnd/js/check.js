var baseUrl = "https://localhost:7053/";
$(document).ready(()=>{
    document.getElementById("RetireBox").style.display="none";
    document.getElementById("InvestBox").style.display="none";
    document.getElementById("PlanDiv").style.display="none";

    var token = sessionStorage.token;
    if(typeof(token) == 'undefined'){
        alert("login first");
        window.location.href = "index.html";
    }
    if(sessionStorage.selectedPlan=='investment')
    {
        document.getElementById("InvestBox").style.display="block";
    } else {
        document.getElementById("RetireBox").style.display="block";
    }
     

});


    document.getElementById("submitPlan2").addEventListener("click", ()=>{
        let q3 = document.getElementById("question3").value;
        let q4 = document.getElementById("question4").value;
        let q5 = document.getElementById("question5").value;
        
        var dataobj = {
            "RetirementYear" : q3,
            "MonthlyExpenses" : q4,
            "ExpectedPeriod" : q5
        }
        alert(JSON.stringify(dataobj))
        $.ajax({
            url: baseUrl+"checkRetirement",
            type: 'POST',
           // added data type
            data : JSON.stringify(dataobj),
            headers : {
              "Access-Control-Allow-Origin" :  "*",
              "Access-Control-Allow-Headers" : "*",
           //    "Access-Control-Request-Method" : "*",
              "Accept" : "*",
              "Content-Type" : "application/json",
              "Authorization": 'Bearer ' + token
            },
            success : function(res) {
             document.getElementById("PlanDiv").style.display="block";
             res = JSON.parse(res);
             console.log(res);
           
            },
            error : function(er) {
               alert("error");
              alert(JSON.stringify(er));
            }

        });
       });








   

    document.getElementById("submitPlan1").addEventListener("click", ()=>{
            var q1 = document.getElementById("question1").value;
            var q2 = document.getElementById("question2").value;
            
            var dataobj = {
                "CurrentAmount" : q1,
                "DateTime" : q2
            };
             alert(q2);
             alert(JSON.stringify(dataobj));
            
             $.ajax({
                url:  baseUrl+"checkInvest",
                type: 'POST',
                data : JSON.stringify(dataobj),
                headers : {
                  "Access-Control-Allow-Origin" :  "*",
                  "Access-Control-Allow-Headers" : "*",
                  "Accept" : "*",
                  "Content-Type" : "application/json",
                  "Authorization": 'Bearer ' + token
                },
                success : function(res) {
                    alert("hello");
                //document.getElementById("PlanDiv").style.display="block";
                
                 
                },
                error : function(er) {
                    alert("error");
                  alert(JSON.stringify(er));
                    
                }
            
        });
        
       
    });
    



