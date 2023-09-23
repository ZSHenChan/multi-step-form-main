function UpdateFeatures(checkbox) {
    let label = checkbox.closest("label")
    console.log(label);
    label.classList.remove("isChecked");
    if (checkbox.checked) {
      label.classList.add("isChecked");
    }
  }

// email validation
const invalidMsg = document.getElementById('invalid-email-msg');
const userName = document.getElementById("userName");
const form = document.getElementById("form-index");
const userEmail = document.getElementById('userEmail');
const userPhoneNum = document.getElementById("userPhoneNum")


// submit buttons
function validateEmail(){
  if (userEmail.value.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)){
    invalidMsg.style.opacity = "0%";
    return true;
  }
  else{
      invalidMsg.style.opacity = "75%";
      return false;
  }
}

function submitIndex(){
  if (validateEmail()){
    const userNameValue = userName.value;
    const userEmailValue = userEmail.value;
    const userPhoneNumValue = userPhoneNum.value;
    localStorage.setItem("userName",userNameValue);
    localStorage.setItem("userEmail",userEmailValue);
    localStorage.setItem("userPhoneNum",userPhoneNumValue);
    window.location.href = "select-plan.html";
  }
}

function submitSelectPlan(){
  let plan = document.querySelector("input[type='radio']:checked");
  let slider = document.getElementById("plan-length");
  let planLength;
  if (slider.checked){
    planLength = false;
  }else{
    planLength = true;
  }
  localStorage.setItem("plan",plan.value);
  localStorage.setItem("monthlyPlan",planLength);
  window.location.href = "pick-add-ons.html";
}

function submitAddOns(){
  let addOns = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
  let addOnsValue = addOns.map(addOn => addOn.value);
  localStorage.setItem("addOns", JSON.stringify(addOnsValue));
  window.location.href = "finishing-up.html";
}

// check out
const planMonthly = 
  {
    "Arcade":9,
    'Advanced': 12,
    "Pro": 15
  };

const AddOns = 
  {
    "Online Service":1,
    'Larger Storage': 2,
    'Customizable Profile': 2
  };

function billRetrieveInfo(){
  const monthlyPlan = localStorage.getItem("monthlyPlan");
  const plan = localStorage.getItem("plan");
  const addOns = JSON.parse(localStorage.getItem("addOns"));

  const billPlan = document.getElementById("bill-plan-123");
  const billPlanLength = document.getElementById("bill-plan-length");
  const billPlanPrice = document.getElementById("bill-plan-price");


  // bill
  billPlan.innerHTML = plan;
  if (monthlyPlan=="true"){
    billPlanLength.innerHTML = "(Monthly)"
    billPlanPrice.innerHTML = `$${planMonthly[plan]}/mo`;

    billAddOns = document.querySelector(".bill-add-ons");
    billAddOns.innerHTML = addOns.map(item => {
      return(
        `<div class="bill-add-ons-item">
      <div class="bill-add-ons-name">${item}</div>
      <div class="bill-add-ons-price">+$${AddOns[item]}/mo</div>
    </div>`
    );
    }).join('');

    const payablePlan = document.getElementById("bill-check-out-plan");
    payablePlan.innerHTML = "(per month)";
    
    //calculate total bill
    let total = planMonthly[plan];
    addOns.forEach((i) => {
      total+=AddOns[i];
    });
    const totalPayable = document.querySelector(".bill-total-payable");
    totalPayable.innerHTML = `$${total}/mo`;
  }else{

    billPlanLength.innerHTML = "(Yearly)"
    billPlanPrice.innerHTML = `$${planMonthly[plan]*10}/yr`;
    
    billAddOns = document.querySelector(".bill-add-ons");
    billAddOns.innerHTML = addOns.map(item => {
      return(
        `<div class="bill-add-ons-item">
      <div class="bill-add-ons-name">${item}</div>
      <div class="bill-add-ons-price">+$${AddOns[item]*10}/yr</div>
    </div>`
    );
    }).join('');

    const payablePlan = document.getElementById("bill-check-out-plan");
    payablePlan.innerHTML = "(per year)";
    
    //calculate total bill
    let total = planMonthly[plan]*10;
    addOns.forEach((i) => {
      total+=AddOns[i]*10;
    });
    const totalPayable = document.querySelector(".bill-total-payable");
    totalPayable.innerHTML = `$${total}/yr`;
  }
  
}