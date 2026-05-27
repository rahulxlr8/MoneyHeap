var baseUrl = "https://localhost:7053/";

$(document).ready(()=>{
  var token = sessionStorage.token;
  document.getElementById("planDetails1").style.display="none";
  if(typeof(token) == 'undefined' || token == ''){
    alert("login first");
    window.location.href = 'index.html';
  }
  // document.getElementById('profileData').addEventListener('click',()=>{
      
    async function selfCall(){
     var userResponse = await findUserData(token);
     var plansData = await FindPlans(token);
     document.getElementById('Name').innerHTML = "Name : " +userResponse.name;
     console.log(plansData[0]);
     for (let i =0 ;i< plansData.length ; i++)
     {
       // console.log(plansData[i]);
      if(plansData[i].name == "Retirement")
      {  
        let node = document.createElement('div');
       
        node.setAttribute("id" , plansData[i].id);
        node.setAttribute("class" , plansData[i].name);
        node.setAttribute("onclick" , "GetPlanData(this)");

        node.innerHTML = (i+1) + " Retirement Plan : StartTime = " + plansData[i].startTime + ", endTime = "+ plansData[i].endTime + ", Final Amount : " + plansData[i].finalAmount; 
        node.style.cssText = "border: 1px solid black; border-radius :10px; margin:5px 5px ; padding :10px ";
        document.getElementById("retirementPlansId").appendChild(node);
      }
      else 
      {  
        let node = document.createElement('div')
        
        node.setAttribute("id" , plansData[i].id);
        node.setAttribute("class" , plansData[i].name);
        node.setAttribute("onclick" , "GetPlanData(this)");
        
        node.innerHTML = (i+1)+ " Investment Plan : StartTime = " + plansData[i].startTime + ", endTime = "+ plansData[i].endTime + ", Final Amount  : " + plansData[i].finalAmount; 
        node.style.cssText = "border: 1px solid black; border-radius :10px;margin:5px 5px ; padding :10px ";
        document.getElementById("investmentPlansId").appendChild(node);
      }
     }
     
   };
   selfCall();

  // });
  document.getElementById("logoutId").addEventListener('click',()=>{
    
      sessionStorage.setItem("token",'');
      window.location.href = 'index.html';
  });

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
async function GetPlanData(val){
  //alert(val.getAttribute('id') + "  " + val.getAttribute('class'))  ;
   var res = await GetPlanById(val);
   document.getElementById("planDetails1").style.display="block";
   console.log(val.getAttribute('class') );
  if(val.getAttribute('class') == 'Retirement'){
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
  }
  else{

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

  }


}
function GetPlanById(val){
 return new Promise((resolve,reject)=>{
  $.ajax({
    url: baseUrl + "get"+val.getAttribute('class')+"ById",
    type: 'POST',
    dataType: 'json', // added data type
    data : JSON.stringify({"Id" : val.getAttribute('id')}),
    headers : {
      "Access-Control-Allow-Origin" :  "*",
      // "Access-Control-Request-Method" : "*",
      "Access-Control-Allow-Headers" : "*",
      "Accept" : "*",
      "Content-Type" : "application/json",
      "Authorization": 'Bearer ' + sessionStorage.token
      
    },
    success: function(res,status,xhr) {
      var response  = JSON.parse(xhr.responseText);
      console.log(response);
      resolve(response);
     // document.getElementById('Name').innerHTML = "Name  : " + response.name;
        
    },
    error : function(error) {

       alert("not authorized to access data");
       reject(error);
    }
    });

  })
}

function findUserData(token){
  return new Promise((resolve,reject)=> { 
    $.ajax({
  url: baseUrl + "count",
type: 'GET',
dataType: 'json', // added data type

headers : {
  "Access-Control-Allow-Origin" :  "*",
  // "Access-Control-Request-Method" : "*",
  "Access-Control-Allow-Headers" : "*",
  "Accept" : "*",
  "Content-Type" : "application/json",
  "Authorization": 'Bearer ' + token
  
},
success: function(res,status,xhr) {
  var response  = JSON.parse(xhr.responseText);
 // document.getElementById('Name').innerHTML = "Name  : " + response.name;
  resolve(response);
    
},
error : function(error) {
   alert("not authorized to access data");
   reject(error);
}
});
});
}



function FindPlans(token) {
return new Promise((resolve,reject)=>{
$.ajax({
  url: baseUrl + "getAllPlans",
  type: 'GET',
  dataType: 'json', // added data type
  
  headers : {
    "Access-Control-Allow-Origin" :  "*",
    // "Access-Control-Request-Method" : "*",
    "Access-Control-Allow-Headers" : "*",
    "Accept" : "*",
    "Content-Type" : "application/json",
    "Authorization": 'Bearer ' + token
    
  },
  success: function(res,status,xhr) {
    console.log(JSON.parse(xhr.responseText));
    var response  = JSON.parse(xhr.responseText);
    resolve(response);
      
  },
  error : function(error) {
     alert("not authorized to access data");
     reject(error);
  }
  });

})
}