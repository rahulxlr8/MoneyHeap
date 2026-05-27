$(document).ready(()=>{
    document.getElementById("RetireBox").style.display="none";
    document.getElementById("InvestBox").style.display="none";
    
    if(sessionStorage.selectedPlan==='investment')
    {
        document.getElementById("InvestBox").style.display="block";
    }
    else{
        document.getElementById("RetireBox").style.display="block";
    }
   
})
