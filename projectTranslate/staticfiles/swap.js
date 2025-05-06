document.getElementById("swap-btn").addEventListener("click", function () {
    const source = document.getElementById("source-lang");
    const target = document.getElementById("target-lang");

    // Swap values
    const temp = source.value;
    source.value = target.value;
    target.value = temp;

    // Opsiyonel: Label'ı güncelle
    document.getElementById("output-lang-label").innerText = target.options[target.selectedIndex].text;
});

const sourceSelect = document.getElementById("source-lang");
const targetSelect = document.getElementById("target-lang");

function updateTargetOptions() {
    const selectedSource = sourceSelect.value;

    // Tüm target optionlarını görünür yap
    Array.from(targetSelect.options).forEach(option => {
        option.disabled = false;
        option.hidden = false;
    });

    // Kaynakta seçilen dili hedeften gizle
    const targetOptionToHide = targetSelect.querySelector(`option[value="${selectedSource}"]`);
    if (targetOptionToHide) {
        targetOptionToHide.disabled = true;
        targetOptionToHide.hidden = true;

        // Eğer şu an seçili olan hedef dili gizlediysen, başka bir tane seç
        if (targetSelect.value === selectedSource) {
            // Otomatik farklı bir dil seç
            const firstValid = Array.from(targetSelect.options).find(opt => !opt.disabled);
            if (firstValid) targetSelect.value = firstValid.value;
        }
    }
    
}

// Her değişimde tetikle
sourceSelect.addEventListener("change", updateTargetOptions);

// İlk yüklemede de uygula
updateTargetOptions();

// options select edildiğinde
targetSelect.addEventListener("change", function () {
    const selectedTarget = targetSelect.value;
    const selectedSource = sourceSelect.value;

    // Eğer kaynak ve hedef diller aynıysa, hedefi varsayılan bir değere ayarla
    if (selectedSource === selectedTarget) {
        // Varsayılan bir dil seç
        const firstValid = Array.from(targetSelect.options).find(opt => !opt.disabled);
        if (firstValid) targetSelect.value = firstValid.value;
    }
    // Opsiyonel: Label'ı güncelle
    
    document.getElementById("output-lang-label").innerText = targetSelect.options[targetSelect.selectedIndex].text;
});

