// Tooltip Logic (remains the same)
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
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    element.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
    });
});

// NEW Map and Language Selection Logic
document.addEventListener('DOMContentLoaded', function() {
    const selectedLanguages = [];
    const regions = document.querySelectorAll('svg a');
    const flagsContainer = document.getElementById('selected-flags-container');
    const compareButtonContainer = document.getElementById('compare-button-container');
    let compareButton = null;

    // Shows or hides the "Compare" button based on selection
    function updateCompareButtonVisibility() {
        if (selectedLanguages.length > 0 && !compareButton) {
            compareButton = document.createElement('button');
            compareButton.id = 'compare-button';
            compareButton.textContent = 'Compare Selected Languages';
            compareButton.addEventListener('click', function() {
                if (selectedLanguages.length > 0) {
                    localStorage.setItem('language1', selectedLanguages[0] || '');
                    localStorage.setItem('language2', selectedLanguages[1] || '');
                    localStorage.setItem('language3', selectedLanguages[2] || '');
                    window.location.href = 'comparison.html';
                } else {
                    alert('Please select at least one language.');
                }
            });
            compareButtonContainer.appendChild(compareButton);
        } else if (selectedLanguages.length === 0 && compareButton) {
            compareButton.remove();
            compareButton = null;
        }
    }

    // Updates the displayed flags
    function updateSelectedFlags() {
        flagsContainer.innerHTML = ''; // Clear existing flags

        selectedLanguages.forEach(lang => {
            // **FIXED LOGIC HERE**
            const regionLink = document.querySelector(`a[data-language="${lang}"]`);
            if (regionLink) {
                const pathElement = regionLink.querySelector('path');
                if (pathElement) {
                    const flagSrc = pathElement.getAttribute('data-tooltip-img');
                    
                    const flagWrapper = document.createElement('div');
                    flagWrapper.className = 'selected-flag';

                    const flagImg = document.createElement('img');
                    flagImg.src = flagSrc;
                    flagImg.alt = lang;

                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-flag';
                    removeBtn.innerHTML = '&times;';
                    removeBtn.onclick = () => deselectLanguage(lang);

                    flagWrapper.appendChild(flagImg);
                    flagWrapper.appendChild(removeBtn);
                    flagsContainer.appendChild(flagWrapper);
                }
            }
        });
    }

    // Function to handle deselecting a language
    function deselectLanguage(language) {
        const index = selectedLanguages.indexOf(language);
        if (index > -1) {
            selectedLanguages.splice(index, 1);
        }
        const regionElement = document.querySelector(`a[data-language="${language}"] path`);
        if (regionElement) {
            regionElement.style.opacity = 1;
        }
        updateSelectedFlags();
        updateCompareButtonVisibility();
    }

    // Add click listeners to each map region
    regions.forEach(link => {
        const path = link.querySelector('path');
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const language = this.getAttribute('data-language');

            if (selectedLanguages.includes(language)) {
                deselectLanguage(language);
            } else {
                if (selectedLanguages.length < 3) {
                    selectedLanguages.push(language);
                    path.style.opacity = 0.5;
                    updateSelectedFlags();
                    updateCompareButtonVisibility();
                } else {
                    alert('You can only select up to 3 languages.');
                }
            }
        });
    });
});
