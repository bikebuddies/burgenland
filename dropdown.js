document.addEventListener("DOMContentLoaded", function() {
    var dropdown = document.querySelector(".dropdown");
    var dropdownMenu = dropdown.querySelector(".dropdown-menu");

    dropdown.addEventListener("mouseover", function() {
        dropdownMenu.style.display = "block";
    });

    dropdown.addEventListener("mouseout", function() {
        dropdownMenu.style.display = "none";
    });

    var dropdownItems = dropdownMenu.querySelectorAll("li");
    dropdownItems.forEach(function(item) {
        item.addEventListener("click", function() {
        });
    });
});