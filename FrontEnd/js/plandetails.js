 var baseUrl = "https://localhost:7053/";
$(document).ready(()=>{
    document.getElementById("RetireBox").style.display="none";
    document.getElementById("InvestBox").style.display="none";
    document.getElementById("planDetails1").style.display = "none";
    // let d = new Date();
    // let dd = new Date("2023-10-26");
    // console.log(d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate());
    // console.log(monthDiff(d,dd));
    var token = sessionStorage.token;
    
    if(typeof(token) == 'undefined' || token == '') {
        alert("login first");
        window.location.href = "index.html";
    }
    if(sessionStorage.selectedPlan=='investment')
    {
        document.getElementById("InvestBox").style.display="block";
    } else {
        document.getElementById("RetireBox").style.display="block";
    }
    document.getElementById("selectPlanBtn").addEventListener("click", (e)=>{
      e.preventDefault();
      var obj = {"Id" : Number(sessionStorage.selectedPlanId)}
     
      if(sessionStorage.selectedPlan == "investment")
      {  
          SubmitPlan(obj,"submitInvestment")
      } else {
        SubmitPlan(obj,"submitRetirement"); 
      }
    })

    function SubmitPlan(dataobj,urlpart){
         
      console.log(dataobj)
      $.ajax({
        url: baseUrl+urlpart,
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
        // document.getElementById("PlanDiv").style.display="block";
          alert(res);
          location.reload();
          
        },
        error : function(er) {
           alert("error");
          alert(JSON.stringify(er));
        }
    });
    }

    document.getElementById("submitPlan2").addEventListener("click", (e)=>{
     e.preventDefault();
      let q3 = document.getElementById("question3").value;
      let q4 = Number(document.getElementById("question4").value);
      let q5 = Number(document.getElementById("question5").value);
      
      var dataobj = {
          "RetirementTime" : q3,
          "MonthlyExpenses" : q4,
          "ExpectedPeriod" : q5
      };
      console.log(dataobj);
      $.ajax({
          url: baseUrl+"checkRetirement",
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
          // document.getElementById("PlanDiv").style.display="block";
          document.getElementById("planDetails1").style.display = "block";
          document.getElementById("RetireBox").style.display = "none";
           res = JSON.parse(res);
           console.log(res);
           sessionStorage.setItem("selectedPlanId", res.Id);
      
           let monthsInvested = monthDiff(new Date(),new Date(res.startTime)); 
           document.getElementById("FV").innerHTML = res.finalAmount;
           document.getElementById("investmentTime").innerHTML= res.investmentTimeLeft + " Months";
           document.getElementById("investedTillNow").innerHTML = res.monthlyInvestment *  monthsInvested;
           document.getElementById("timeTillNow").innerHTML = monthsInvested;
           document.getElementById("monthlyInvestment").innerHTML = res.monthlyInvestment;
           document.getElementById("inflation").innerHTML = res.inflation;
           document.getElementById("return").innerHTML = res.returnPercentage;
           document.getElementById("riskProfile").innerHTML = res.risk;
           document.getElementById("fd").innerHTML = res.fd;
           document.getElementById("mf").innerHTML = res.mf;
           document.getElementById("equity").innerHTML = res.equity;
          },
          error : function(er) {
             alert("error");
            alert(JSON.stringify(er));
          }
      });
     });

  document.getElementById("submitPlan1").addEventListener("click", (e)=>{
          e.preventDefault();
          var q1 = document.getElementById("question1").value;
          var q2 = document.getElementById("question2").value;
          
          var dataobj = {
              "CurrentAmount" : q1,
              "DateTime" : q2
          };
         // debugger;
           $.ajax({
              url:  baseUrl+"checkInvest",
              type: 'POST',
              data : JSON.stringify(dataobj),
              headers : {
                "Access-Control-Allow-Origin" :  "*",
                "Access-Control-Allow-Headers" : "*",
                "Accept" : "*",
                "Content-Type" : "application/json",
                "Authorization": "Bearer " + token
              },
              success : function(res) {
                document.getElementById("planDetails1").style.display = "block";
                document.getElementById("InvestBox").style.display = "none";
                
                  res = JSON.parse(res);
                  console.log(res.Id + " " + res.email + " " +  res.currentAmount + " "+ res.startTime + " " + res.endTime +  "  "+
                  res.risk + " " + res.finalAmount + " " + res.investmentTime + "  " + res.monthlyExpenses +  "  " + res.inflation + " "+
                  res.returnPercentage + " " + res.fd + " " + res.mf + " " +res.equity);

                  sessionStorage.setItem("selectedPlanId", res.Id);

                  let monthsInvested = monthDiff(new Date(),new Date(res.startTime)); 
                  document.getElementById("FV").innerHTML = res.finalAmount;
                  document.getElementById("investmentTime").innerHTML= res.investmentTime + " Months";
                  document.getElementById("investedTillNow").innerHTML = res.monthlyInvestment *  monthsInvested;
                  document.getElementById("timeTillNow").innerHTML = monthsInvested;
                  document.getElementById("monthlyInvestment").innerHTML = res.monthlyInvestment;
                  document.getElementById("inflation").innerHTML = res.inflation;
                  document.getElementById("return").innerHTML = res.returnPercentage;
                  document.getElementById("riskProfile").innerHTML = res.risk;
                  document.getElementById("fd").innerHTML = res.fd;
                  document.getElementById("mf").innerHTML = res.mf;
                  document.getElementById("equity").innerHTML = res.equity;
                  
                  
              },
              error : function(er) {
                  console.log(er);
                // alert(JSON.stringify(er));   
              }
      })

  
    });

 function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  // edit: increment months if d2 comes later in its month than d1 in its month
  if (d2.getDate() >= d1.getDate())
      months++
  // end edit
  return months <= 0 ? 0 : months;
}
    
});


    
    
// $(document).ready(()=>{
          
  
//   document.getElementById("submitPlan1").addEventListener('click', (event)=>{
//    event.preventDefault();
//     var q1 = document.getElementById("question1").value;
//     var q2 = document.getElementById("question2").value;
          
//           var dataobj = {
//               "CurrentAmount" : q1,
//               "DateTime" : q2
//           };

//   var dataobj2 = {"CurrentAmount":"100024220","DateTime":"2025-10-24"}
//   console.log(dataobj);
//   console.log(dataobj2)
//   console.log("jjj");
//   $.ajax({
//     url: baseUrl + "checkInvest",
//   type: 'POST',
//   dataType: 'json', // added data type
//   data : JSON.stringify(dataobj2),
//   headers : {
//     "Access-Control-Allow-Origin" :  "*",
//     // "Access-Control-Request-Method" : "*",
//     "Access-Control-Allow-Headers" : "*",
//     "Accept" : "*",
//     "Content-Type" : "application/json",
//     "Authorization": 'Bearer ' + sessionStorage.token
    
//   },
//   success: function(res,status,xhr) {
//     var response  = JSON.parse(xhr.responseText);
//    // document.getElementById('Name').innerHTML = "Name  : " + response.name;
//    console.log(response);
      
//   },
//   error : function(error) {
//      alert("not authorized to access data");
    
//   }
//   });




//   });
  
// })



