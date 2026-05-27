      
var baseUrl = "https://localhost:7053/";
$(document).ready(function() {

  //login check
  document.getElementById("submitLogin").addEventListener("click", ()=>{
       


        let emailID = document.getElementById("InputEmail1").value;
        let passwordKey = document.getElementById("InputPassword1").value; 
      
      // Minimum eight characters, at least one letter, one number and one special character 
        let pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if(pattern.test(passwordKey)) {
          //write the ajax code to send to backend then check the validation there as well.

          var credentials = {
            "email" : emailID,
            "password" : passwordKey
          };
          console.log(JSON.stringify(credentials));

          $.ajax({
            url: baseUrl+"login",
            type: 'POST',
           // added data type
            data : JSON.stringify(credentials),
            headers : {
              "Access-Control-Allow-Origin" :  "*",
              "Access-Control-Allow-Headers" : "*",
           //    "Access-Control-Request-Method" : "*",
              "Accept" : "*",
              "Content-Type" : "application/json"
            },
            success : function(res, status, xhr) {
             // alert("hello " + res.getAllResponseHeaders());
             
             res = JSON.parse(res);
             let token = xhr.getResponseHeader("token");
             console.log(token);
             
              sessionStorage.setItem("token",token);
              alert("logged in successful");
              window.location.href = 'index.html';
            //  console.log("value ");
            //  console.log(sessionStorage.getItem("token"));
             
            },
            error : function(er) {
               alert("error");
              alert(JSON.stringify(er));
            }
            
        });
      }
      else {
        alert("wrong email or password");
      }

  });
  
  // //signUp check
  document.getElementById("submitSignup").addEventListener("click", (event)=>{
    event.preventDefault();
          let fullName = document.getElementById("InputName2").value;
          let emailID = document.getElementById("InputEmail2").value;
          let passwordKey = document.getElementById("InputPassword2").value;
          let role = document.getElementById("roleType").value;
            alert(fullName + " " + emailID + "  " + passwordKey + " " + role);
        // Minimum eight characters, at least one letter, one number and one special character 
          let pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if(pattern.test(passwordKey)) {
            
            var credentials = {
              "name" : fullName,
              "email" : emailID,
              "password" : passwordKey,
              "role" : role
            };
            console.log(JSON.stringify(credentials));
            //write the ajax code to send to backend then check the validation there as well.
            alert("makeing calls");
            $.ajax({
              url: baseUrl+"signup",
              type: 'POST',
             // added data type
              data : JSON.stringify(credentials),
              headers : {
                "Access-Control-Allow-Origin" :  "*",
             //    "Access-Control-Request-Method" : "*",
                "Accept" : "*",
                "Content-Type" : "application/json"
              },
              success : function(res) {
                alert(res);
                
            
              },
              error : function(er) {
                
                 alert(JSON.stringify(er));
              }
              
          });
        }
        else {
          alert("wrong email or password");
        }
  
    });

 
  document.getElementById("movetoLogin").addEventListener("click",()=>{
        document.getElementById("SignupBox").style.display = "none"; 
        document.getElementById("loginBox").style.display ="block"; 
		
  })

    document.getElementById("loginNav").addEventListener("click",()=>{
           let visibility =  document.getElementById("loginBox").style.display;
           console.log(visibility+" answer ");
           if(visibility==="block"){
            document.getElementById("loginBox").style.display = "none"; 
           } else {
            document.getElementById("loginBox").style.display ="block"; 
		
          }
    });
    document.getElementById("movetoSignup").addEventListener("click",()=>{
      document.getElementById("loginBox").style.display ="none";
      document.getElementById("SignupBox").style.display = "block"; 
     
    })
  
  
  
});


  //   $.ajax({
  //     url: baseUrl + "count",
  //     type: 'GET',
  //     dataType: 'json', // added data type
  //     headers : {
  //       "Access-Control-Allow-Origin" :  "*",
  //       // "Access-Control-Request-Method" : "*",
  //       "Accept" : "*",
  //       "Content-Type" : "application/json"
  //     },
  //     success: function(res) {
  //         console.log(res);
       
  //         document.getElementById("IDDD1").textContent = res;
  //     }
  // });