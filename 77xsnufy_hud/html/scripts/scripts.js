let hudVisible = true; // Domyślnie HUD jest widoczny

window.addEventListener("message", function (event) {
    const toDegrees = (value) => (value / 100) * 360; // Funkcja do konwersji na stopnie

    switch (event.data.action) {
        case "Voicey":
            if (!hudVisible) return;
            $('.fa-microphone-lines').css('color', event.data.arr.talking ? '#808080' : '#ffcc99');

            const volumeHeights = {
                Whisper: 25,
                Normal: 70,
                Shouting: 100
            };
            const voiceLevel = event.data.arr.volume || 'Normal';
            const voicePercent = volumeHeights[voiceLevel] || 0;
            document.querySelector('#voice').style.setProperty('--rotation', `${toDegrees(voicePercent)}deg`);
            break;

        case "updateVoiceActive":
            if (!hudVisible) return;
            const voiceIndicatorContainer = document.querySelector(".xsnufy_hud_item_5");
            if (voiceIndicatorContainer) {
                if (event.data.active) {
                    voiceIndicatorContainer.classList.add("active");
                } else {
                    voiceIndicatorContainer.classList.remove("active");
                }
            }
            break;

        case "updateStatus":
            if (!hudVisible) return;

            const health = event.data.arr.health || 0;
            const thirst = event.data.arr.thirst || 0;
            const hunger = event.data.arr.hunger || 0;
            const stamina = event.data.arr.stamina || 0;
            const armour = event.data.arr.armour || 0;

// Aktualizuj rotację wskaźników
document.querySelector('#health').style.setProperty('--rotation', `${toDegrees(health)}deg`);
document.querySelector('#thirst').style.setProperty('--rotation', `${toDegrees(thirst)}deg`);
document.querySelector('#hunger').style.setProperty('--rotation', `${toDegrees(hunger)}deg`);
document.querySelector('#stamina').style.setProperty('--rotation', `${toDegrees(stamina)}deg`);

const staminaElement = document.querySelector(".xsnufy_hud_item_7");
if (staminaElement) {
    const staminaLevel = event.data.arr.stamina || 0;

    if (staminaLevel < 100 && staminaLevel > 0) {
        staminaElement.style.display = "flex";

        // Dopasowanie do kształtu heksagonu
        const hexFillElement = staminaElement.querySelector(".hex-fill");
        if (hexFillElement) {
            hexFillElement.style.clipPath = `polygon(
                50% 0%, 
                ${(50 + staminaLevel / 2)}% ${staminaLevel}%, 
                ${(50 - staminaLevel / 2)}% ${staminaLevel}%,
                0% 50%, 
                50% 100%, 
                100% 50%
            )`; // Modyfikacja wypełnienia heksagonu
        }
    } else {
        staminaElement.style.display = "none";
    }
}



// Obsługa wskaźnika armour
const armourElement = document.querySelector('#armour');
if (armour > 0) {
    if (armourElement) {
        armourElement.style.setProperty('--rotation', `${toDegrees(armour)}deg`);
        armourElement.parentElement.style.display = 'flex';
    }
} else {
    if (armourElement) {
        armourElement.parentElement.style.display = 'none';
    }
}

            break;

        case "updateLung":
            if (!hudVisible) return;
            const lungLevel = event.data.lung || 0;
            const lungElement = document.querySelector("#lung");
            const lungHudItem = document.querySelector(".xsnufy_hud_item_6");

            if (lungElement && lungHudItem) {
                if (lungLevel < 100) {
                    lungHudItem.style.display = "flex";
                    lungElement.style.setProperty("--rotation", `${toDegrees(lungLevel)}deg`);
                } else {
                    lungHudItem.style.display = "none";
                }
            }
            break;

        case "showhud":
            hudVisible = event.data.visible;
            const hudContainer = document.querySelector(".xsnufy_hud_all_container");
            if (hudVisible) {
                hudContainer.style.display = "flex";
            } else {
                hudContainer.style.display = "none";
            }
            break;

        case 'xsnufy_hud_in':
            if (hudVisible) $('.xsnufy_hud_all_container').fadeIn(300);
            break;

        case 'xsnufy_hud_out':
            if (hudVisible) $('.xsnufy_hud_all_container').fadeOut(300);
            break;
    }
});

window.addEventListener("load", function () {
    const lungHudItem = document.querySelector(".xsnufy_hud_item_6");
    if (lungHudItem) {
        lungHudItem.style.display = 'none';
    }

    // Inicjalizacja wskaźnika armour
    const armourElement = document.querySelector('#armour');
    if (armourElement) {
        const armourValue = armourElement.dataset.value || 0;
        if (armourValue > 0) {
            armourElement.parentElement.style.display = 'flex';
        } else {
            armourElement.parentElement.style.display = 'none';
        }
    }
});



window.addEventListener("message", function (event) {
    const item = event.data;
    switch (item.process) {
        case 'xsnufy_on_carhud':
            if (hudVisible) {
                $('.xsnufy_carhud_container').css({ 'display': `flex` });

                // Aktualizacja prędkości
                const speed = Math.round(item.speedLevel).toString().padStart(3, '0');
                $("#speed").html(`${speed}<span></span>`);

                // Aktualizacja kierunku i ulicy
                $("#heading").html(item.heading);
                $("#street").html(item.streetName);

                // Obsługa wskaźnika paliwa
                const fuelLevel = item.fuelLevel || 0; // Pobranie poziomu paliwa
                const fuelElement = document.querySelector('.hexagon'); // Wskaźnik paliwa (heksagon)
                const fuelText = document.querySelector('#fuel-text'); // Tekst procentowy paliwa

                if (fuelElement) {
                    // Zmiana wypełnienia paliwa
                    fuelElement.style.background = `linear-gradient(0deg,#ffcc00 ${fuelLevel}%, transparent ${fuelLevel}%)`;

                    // Ustaw widoczność wskaźnika w zależności od poziomu paliwa
                    if (fuelLevel > 0) {
                        fuelElement.style.opacity = 1; // Widoczny
                    } else {
                        fuelElement.style.opacity = 0; // Ukryty
                    }
                }

                if (fuelText) {
                    // Aktualizacja tekstu poziomu paliwa
                    fuelText.textContent = `${Math.round(fuelLevel)}%`;
                }
            }
            break;

        case 'xsnufy_off_carhud':
            $('.xsnufy_carhud_container').css({ 'display': `none` });
            break;
    }
});

