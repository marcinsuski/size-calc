
$(document).ready(function() {
  const sanitizeAndValidateInput = (userInput) => {
    if (userInput === "") {
      return 0;
    }
    const sanitizedInput = userInput.replace(/['";:]/g, "").trim();
    const numericInput = sanitizedInput.replace(",", ".");
    return !isNaN(numericInput) ? parseFloat(numericInput) : 0;
  };

  const findSize = (sizesArray, measure1, measure2) => {
    if (!sizesArray) {
      console.log("No sizes array provided.");
      return -1;
    }
    const index = sizesArray.findIndex((item) => {
      const [minUnderBust, maxUnderBust] = item.underBust;
      const [minBust, maxBust] = item.Bust;
      return (
        measure1 >= minUnderBust &&
        measure1 <= maxUnderBust &&
        measure2 >= minBust &&
        measure2 <= maxBust
      );
    });

    return index !== -1 ? sizesArray[index].size : -1;
  };

  let firstMeasure = $("#first_measure");
  let secondMeasure = $("#second_measure");
  const calculateBtn = $("#calc_size_btn");
  const result = $(".result");

  const findBraSize = () => {
    let first_measure = sanitizeAndValidateInput(firstMeasure.val());
    let second_measure = sanitizeAndValidateInput(secondMeasure.val());
    const braSize = findSize(bra, first_measure, second_measure);
    braSize !== -1
      ? result.html(`Twój rozmiar stanika to: ${braSize}`)
      : result.html(`Nie posiadamy stanika w takim rozmiarze.`);
  };

  calculateBtn.on("click", findBraSize);
});
