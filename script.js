  // Tooltip Logic
  const tooltip = document.getElementById("tooltip");
  const tooltipImg = tooltip.querySelector("img");
  const tooltipText = tooltip.querySelector("#tooltip-text");
  
  document.querySelectorAll(".tooltip-trigger").forEach(element => {
  element.addEventListener("mouseover", (e) => {
    const imgSrc = e.target.dataset.tooltipImg;
    const textContent = e.target.dataset.tooltipText;
  
    tooltipImg.src = imgSrc;
    tooltipText.textContent = textContent;
  
    tooltip.style.display = "block";
  });
  
  element.addEventListener("mousemove", (e) => {
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY - tooltip.offsetHeight - 10}px`; // Adjust to appear above the pointer
  });
  
  element.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });
  });
  
  //map
  document.addEventListener('DOMContentLoaded', function () {
    const selectedLanguages = [];
    const comparisonTableContainer = document.getElementById('comparison-table-container');
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.querySelector('#comparisonTable tbody');

    // Add click event listeners to all <a> tags in the SVG map
    document.querySelectorAll('svg a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior

            const language = this.getAttribute('data-language');

            // Add or remove the language from the selectedLanguages array
            if (selectedLanguages.includes(language)) {
                // If already selected, remove it
                selectedLanguages.splice(selectedLanguages.indexOf(language), 1);
                this.style.opacity = 1; // Reset opacity
            } else {
                // If not selected, add it (up to 3 languages)
                if (selectedLanguages.length < 3) {
                    selectedLanguages.push(language);
                    this.style.opacity = 0.5; // Dim the selected region
                } else {
                    alert('You can only select up to 3 languages.');
                }
            }

            console.log('Selected Languages:', selectedLanguages);
        });
    });

    // Create the floating button
    const compareButton = document.createElement('button');
    compareButton.id = 'compare-button'; // Add an ID for styling
    compareButton.textContent = 'Compare Selected Languages';
    compareButton.addEventListener('click', function () {
        if (selectedLanguages.length > 0) {
            // Store selected languages in localStorage
            localStorage.setItem('language1', selectedLanguages[0] || '');
            localStorage.setItem('language2', selectedLanguages[1] || '');
            localStorage.setItem('language3', selectedLanguages[2] || '');

            // Redirect to the comparison page
            window.location.href = 'comparison.html';
        } else {
            alert('Please select at least one language.');
        }
    });

    // Append the button to the body
    document.body.appendChild(compareButton);
});

  // compare
  function compareLanguages() {
    const language1 = document.getElementById('language1').value;
    const language2 = document.getElementById('language2').value;
    const language3 = document.getElementById('language3').value;

    // Store selected languages in localStorage
    localStorage.setItem('language1', language1);
    localStorage.setItem('language2', language2);
    localStorage.setItem('language3', language3);

    // Redirect to the comparison page
    window.location.href = 'comparison.html';
}