function UpdateFeatures(checkbox) {
    let label = checkbox.closest("label")
    console.log(label);
    label.classList.remove("isChecked");
    if (checkbox.checked) {
      label.classList.add("isChecked");
    }
  }