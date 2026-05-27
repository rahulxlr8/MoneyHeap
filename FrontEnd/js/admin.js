var baseUrl = "https://localhost:7053/";
$(document).ready(()=>{
   
    $.ajax({
        url:  baseUrl+"getAdminData",
        type: 'GET',
        headers : {
          "Access-Control-Allow-Origin" :  "*",
          "Access-Control-Allow-Headers" : "*",
          "Accept" : "*",
          "Content-Type" : "application/json",
          "Authorization": 'Bearer ' + sessionStorage.token
        },
        success : function(res,status,xhr) {
            //alert(JSON.parse(xhr.responseText));
            res= JSON.parse(res);
          //  alert(res.LowRisk + " " + res.MidRisk + " " +res.HighRisk+ " jjehe");
            document.getElementById("LowRisk").value = res.LowRisk;
            document.getElementById("MidRisk").value = res.MidRisk;
            document.getElementById("HighRisk").value = res.HighRisk;
            document.getElementById("inflation").value = res.Inflation;
        },
        error : function(er) {
            alert("error");
          alert(JSON.stringify(er));
        }
    
});
function getAllQuestions(){
$.ajax({
  url: "https://localhost:7053/getAllQuestions",
  type: 'GET',
  headers : {
    "Access-Control-Allow-Origin" :  "*",
    "Access-Control-Allow-Headers" : "*",
    "Accept" : "*",
    "Content-Type" : "application/json",
    "Authorization": 'Bearer ' + sessionStorage.token
  },
  success : function(res,status,xhr) {
      //alert(JSON.parse(xhr.responseText));
      res= JSON.parse(res);
      console.log(res);
      console.log(res.length);
      
    //  alert(res.LowRisk + " " + res.MidRisk + " " +res.HighRisk+ " jjehe");
    
    //  var inner= " <div class='btn-group'> " + 
    // " <button type='button' class='btn btn-danger dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
    //  "  Action"+
    //  "</button>"+
    //  "<div class='dropdown-menu'>"+
    //  "  <a class='dropdown-item' href='#'>Action</a>"+
    //   " <a class='dropdown-item' href='#'>Another action</a>"+
    // "   <a class='dropdown-item' href='#'>Something else here</a>"+
    //  "  <div class='dropdown-divider'></div>"+
    //   " <a class='dropdown-item' href='#'>Separated link</a>"+
    // " </div>"+
    //  "</div>";

     for (var i = 0;i<res.length;i++)
     {  
      var inner= " <div class='btn-group my-2'> " + 
      " <button type='button' class='btn btn-danger dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
        res[i].question+
       "</button>"+
       "<div class='dropdown-menu'>"+
       "  <a class='dropdown-item' href='#'>" + res[i].option1+" weight = "+res[i].weight1    +" </a>"+
        " <a class='dropdown-item' href='#'>" + res[i].option2+" weight = "+res[i].weight2    +"  </a>"+
      "   <a class='dropdown-item' href='#'>" + res[i].option3+" weight = "+res[i].weight3    +" </a>"+
      "   <a class='dropdown-item' href='#'>" + res[i].option4+" weight = "+res[i].weight4    +"  </a>"+
     
       "</div>";
      console.log(inner);
       let node = document.createElement('div');
   
       node.innerHTML = inner;
       document.getElementById("getAllQ").appendChild(node);

     }




  },
  error : function(er) {
      alert("error");
    alert(JSON.stringify(er));
  }

});
}
getAllQuestions();

    document.getElementById("updateAdmin").addEventListener("click", ()=>{
        var lowrisk = document.getElementById("LowRisk").value;
        var midrisk = document.getElementById("MidRisk").value;
        var highrisk = document.getElementById("HighRisk").value;
        var inflation = document.getElementById("inflation").value;
        

        var dataobj = {
            "LowRisk" : lowrisk,
            "MidRisk" : midrisk,
            "HighRisk" : highrisk,
            "Inflation" : inflation
        };
       //  alert(JSON.stringify(dataobj));
        
         $.ajax({
            url:  baseUrl+"updateAdmin",
            type: 'POST',
            data : JSON.stringify(dataobj),
            headers : {
              "Access-Control-Allow-Origin" :  "*",
              "Access-Control-Allow-Headers" : "*",
              "Accept" : "*",
              "Content-Type" : "application/json",
              "Authorization": 'Bearer ' + sessionStorage.token
            },
            success : function(res) {
                alert("updated");
            //document.getElementById("PlanDiv").style.display="block";
              getAllQuestions();  
             
            },
            error : function(er) {
         //       alert("error");
              alert(JSON.stringify(er));
                
            }
        
    });
    
   
});
document.getElementById("AddMCQuestion").addEventListener("click", (e)=>{
  e.preventDefault();
  var question = document.getElementById("addQuestionId").value;
  var option1 = document.getElementById("addOption1").value;
  var option2 = document.getElementById("addOption2").value;
  var option3 = document.getElementById("addOption3").value;
  var option4 = document.getElementById("addOption4").value;
  
  var weight1 = document.getElementById("addOption1weight").value;
  var weight2 = document.getElementById("addOption2weight").value;
  var weight3 = document.getElementById("addOption3weight").value;
  var weight4 = document.getElementById("addOption4weight").value;
  
  
  var dataobj = {
    "question" : question,
    "options" : [
         option1,
         option2,
         option3,
         option4
    ],
    "weights" : [
         weight1,weight2,weight3 ,weight4
    ]
  
  };

   alert(JSON.stringify(dataobj));
   console.log(JSON.stringify(dataobj));
   $.ajax({
      url:  baseUrl+"addQuestion",
      type: 'POST',
      data : JSON.stringify(dataobj),
      headers : {
        "Access-Control-Allow-Origin" :  "*",
        "Access-Control-Allow-Headers" : "*",
        "Accept" : "*",
        "Content-Type" : "application/json",
        "Authorization": 'Bearer ' + sessionStorage.token
      },
      success : function(res) {
          alert("updated");

      //document.getElementById("PlanDiv").style.display="block";
      
       
      },
      error : function(er) {
   //       alert("error");
        alert(JSON.stringify(er));
          
      }
  
});


});

});


   







   

    
