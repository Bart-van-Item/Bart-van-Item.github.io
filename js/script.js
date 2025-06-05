// Geboortedatum: 2001-10-18
const birthDate = new Date(2001, 9, 18); // oktober = maand 9

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const beforeBirthday =
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    if (beforeBirthday) age--;
    return age;
}

document.addEventListener('DOMContentLoaded', () => {
    const ageSpan = document.getElementById('age');
    if (ageSpan) {
        ageSpan.textContent = calculateAge(birthDate);
    }
});
