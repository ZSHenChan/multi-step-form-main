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
  if (!userEmail.checkValidity()){
    invalidMsg.style.opacity = "75%";
    return false;
  }
  else{
    invalidMsg.style.opacity = "0%";
}
  if (userEmail.checkValidity()&&userPhoneNum.checkValidity()&&userName.checkValidity()){
    return true;
  }
  else{
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
  localStorage.setItem("plan",plan.value);
  window.location.href = "pick-add-ons.html";
}

function submitAddOns(){
  let addOns = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
  let addOnsValue = addOns.map(addOn => addOn.value);
  localStorage.setItem("addOns", JSON.stringify(addOnsValue));
  window.location.href = "finishing-up.html";
}

// check out
const planMonthly = [{
  "Arcade":9,
  'Advanced': 12,
  "Pro": 15
  },{
  "Arcade":90,
  'Advanced': 120,
  "Pro": 150
  }
]
  

const AddOns = [
  {
    "Online Service":1,
    'Larger Storage': 2,
    'Customizable Profit': 2
  },
  {
    "Online Service":10,
    'Larger Storage': 20,
    'Customizable Profit': 20
  }
]
  

function billRetrieveInfo(){
  const monthly = localStorage.getItem("monthly");
  const pl = localStorage.getItem("pl");
  const plan = localStorage.getItem("plan");
  const addOns = JSON.parse(localStorage.getItem("addOns"));

  const billPlan = document.getElementById("bill-plan-123");
  const billPlanLength = document.getElementById("bill-plan-length");
  const billPlanPrice = document.getElementById("bill-plan-price");

  const billAddOns = document.querySelector(".bill-add-ons");
  const payablePlan = document.getElementById("bill-check-out-plan");

  // bill
  if (monthly==0){
    billPlanLength.innerHTML = "(Monthly)"
    payablePlan.innerHTML = "(per month)";
    
  }else{

    billPlanLength.innerHTML = "(Yearly)"
    payablePlan.innerHTML = "(per year)";
  
  }
  billPlan.innerHTML = plan;
  billPlanPrice.innerHTML = `$${planMonthly[monthly][plan]}/${pl}`;

  billAddOns.innerHTML = addOns.map(item => {
    return(
      `<div class="bill-add-ons-item">
    <div class="bill-add-ons-name">${item}</div>
    <div class="bill-add-ons-price">+$${AddOns[monthly][item]}/${pl}</div>
  </div>`
  );
  }).join('');

  let total = planMonthly[monthly][plan];
    addOns.forEach((i) => {
      total+=AddOns[monthly][i];
    });
  const totalPayable = document.querySelector(".bill-total-payable");
  totalPayable.innerHTML = `$${total}/${pl}`;
  localStorage.setItem("totalPrice",total);
}

// plan changing
function changePlan(){
  
  const arcadePrice = document.getElementById("arcade-price");
  const advancedPrice = document.getElementById("advanced-price");
  const proPrice = document.getElementById("pro-price");
  const planToggle = document.getElementById("plan-length");
  const yearlyDiscountText = document.querySelectorAll(".yearly-discount-text");

  let monthly=0;
  let pl = "mo";
  if (planToggle.checked){
    monthly=1;
    pl = "yr";
    yearlyDiscountText.forEach(i=>{
      i.style.opacity = "100%";
    })
  }else{
    yearlyDiscountText.forEach(i=>{
      i.style.opacity = "0%";
    })
  }
  arcadePrice.innerHTML = `$${planMonthly[monthly]["Arcade"]}/${pl}`
  advancedPrice.innerHTML = `$${planMonthly[monthly]["Advanced"]}/${pl}`
  proPrice.innerHTML = `$${planMonthly[monthly]["Pro"]}/${pl}`
  localStorage.setItem("monthly",monthly);
  localStorage.setItem("pl",pl);
}

function loadAddOns(){
  const pl = localStorage.getItem("pl");
  const monthly = localStorage.getItem("monthly");

  const onlineService = document.getElementById("onlineService");
  const largerStorage = document.getElementById("largerStorage");
  const customizableProfit = document.getElementById("customizableProfit");
  onlineService.innerHTML = `+$${AddOns[monthly]["Online Service"]}/${pl}`;
  largerStorage.innerHTML = `+$${AddOns[monthly]["Larger Storage"]}/${pl}`;
  customizableProfit.innerHTML = `+$${AddOns[monthly]["Customizable Profit"]}/${pl}`;
}

//check out button
function checkOut(){
  window.location.href = "success.html";
}