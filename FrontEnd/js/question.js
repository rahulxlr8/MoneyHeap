var baseUrl = "https://localhost:7053/";
$(document).ready(function() {
    console.log("ready");
    
    var token = sessionStorage.token;
   
    if(typeof(token) == 'undefined' || token == ''){
      alert("login first");
      window.location.href = 'index.html';
    }
   

    document.getElementById("riskProfile").style.display = "none";
    document.getElementById("questionForm").style.display = "block";
    console.log(token );
    $.ajax({
    url: baseUrl + "ques",
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
    success: function(res,status, xhr) {
       
        var response = JSON.parse(xhr.responseText);
        console.log(xhr);
        if(!response.lastQuestion){ 
        sessionStorage.setItem("questionId",response.Id)
        document.getElementById("question").innerText = response.question;
        document.getElementById("Qoption1").innerText = response.option1;
        document.getElementById("Qoption2").innerText = response.option2;
        document.getElementById("Qoption3").innerText = response.option3;
        document.getElementById("Qoption4").innerText = response.option4;
        console.log(response);  
        }
        else{
          if(response.riskAmount < 200)
          {
            document.getElementById("riskPic").setAttribute("src","static/lowrisk.png")
          }
          else if(response.riskAmount >=200  && response.riskAmount <400){
            document.getElementById("riskPic").setAttribute("src","static/midrisk.png")
          }
          else{
            document.getElementById("riskPic").setAttribute("src","static/highrisk.png")
          }
          document.getElementById("questionForm").style.display = "none";
          document.getElementById("riskProfile").style.display = "block";
        }
    },
    error : function(error) {
       alert("not authorized to access data");
    }
    });



    document.getElementById("nextQuestion").addEventListener("click", ()=>{

        var selectedoption = 0;
        if(document.getElementById("option1").checked){
            selectedoption = 1;
        } else if(document.getElementById("option2").checked){
            selectedoption = 2;
        } else if(document.getElementById("option3").checked){
            selectedoption = 3;
        } else if(document.getElementById("option4").checked){
            selectedoption = 4;
        } else {
             alert("answer the questions");
        }
        if(selectedoption !== 0)
        {  
            var reqObj = {
                "answerId" : selectedoption,
                "questionId" : sessionStorage.questionId
            }
            console.log(JSON.stringify(reqObj));
           
            $.ajax({
              url: baseUrl+"nextques",
              type: 'POST',
             // added data type
              data : JSON.stringify(reqObj),
              headers : {
                "Access-Control-Allow-Origin" :  "*",
                "Access-Control-Allow-Headers" : "*",
                // "Access-Control-Request-Method" : "*",
                "Accept" : "*",
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + token  
              },
              success : function(res,status, xhr) {
               
                var response = JSON.parse(xhr.responseText);
               if(!response.lastQuestion){ 
                sessionStorage.setItem("questionId",response.Id)
                document.getElementById("question").innerText = response.question;
                document.getElementById("Qoption1").innerText = response.option1;
                document.getElementById("Qoption2").innerText = response.option2;
                document.getElementById("Qoption3").innerText = response.option3;
                document.getElementById("Qoption4").innerText = response.option4;
                console.log(response);  
               }
               else{
                  document.getElementById("questionForm").style.display = "none";
                  document.getElementById("riskProfile").style.display = "block";
               }
              },
              error : function(er) {
                 alert(JSON.stringify(er));
              }
          });

           
        }
        else{
            alert("answer the question");
        }

  });
  // document.getElementById("enterPlan").addEventListener('click',()=>{
  //     let plan = sessionStorage.selectedPlan;
  //     if(plan === "investment")
  //     {
  //         window.location.href = 'invest.html';
  //     }
  //     else{
  //         window.location.href = 'retire.html';
  //     }
  // });

});