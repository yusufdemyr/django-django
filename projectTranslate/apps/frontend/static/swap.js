document.getElementById("swap-btn").addEventListener("click", function () {
    const source = document.getElementById("source-lang");
    const target = document.getElementById("target-lang");

    // Swap the values
    const temp = source.value;
    source.value = target.value;
    target.value = temp;

    // Optional: update the label
    document.getElementById("output-lang-label").innerText = target.options[target.selectedIndex].text;
});

const sourceSelect = document.getElementById("source-lang");
const targetSelect = document.getElementById("target-lang");

function updateTargetOptions() {
    const selectedSource = sourceSelect.value;

    // Make all target options visible and enabled
    Array.from(targetSelect.options).forEach(option => {
        option.disabled = false;
        option.hidden = false;
    });

    // Hide the language selected as source from the target
    const targetOptionToHide = targetSelect.querySelector(`option[value="${selectedSource}"]`);
    if (targetOptionToHide) {
        targetOptionToHide.disabled = true;
        targetOptionToHide.hidden = true;

        // If you've hidden the currently selected target language, pick another one
        if (targetSelect.value === selectedSource) {
            // Automatically select a different language
            const firstValid = Array.from(targetSelect.options).find(opt => !opt.disabled);
            if (firstValid) targetSelect.value = firstValid.value;
        }
    }
}

// Trigger on every change of the source selection
sourceSelect.addEventListener("change", updateTargetOptions);

// Apply on initial load as well
updateTargetOptions();

// When the target selection changes
targetSelect.addEventListener("change", function () {
    const selectedTarget = targetSelect.value;
    const selectedSource = sourceSelect.value;

    // If source and target languages are the same, reset the target to a default value
    if (selectedSource === selectedTarget) {
        // Select a default language
        const firstValid = Array.from(targetSelect.options).find(opt => !opt.disabled);
        if (firstValid) targetSelect.value = firstValid.value;
    }
    // Optional: update the label
    document.getElementById("output-lang-label").innerText = targetSelect.options[targetSelect.selectedIndex].text;
});
