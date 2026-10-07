(function () {
    var categoryButtons = document.querySelectorAll(".day-btn[data-category]");
    var categories = document.querySelectorAll(".bar-category");
    var searchInput = document.getElementById("drink-search");
    var feedback = document.getElementById("drink-search-feedback");

    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function activeCategory() {
        return document.querySelector(".bar-category.is-visible");
    }

    function applyDrinkFilter() {
        var query = searchInput ? normalizeText(searchInput.value.trim()) : "";
        var current = activeCategory();

        if (!current) {
            return;
        }

        var groups = current.querySelectorAll(".day-group");
        var visibleItems = 0;

        groups.forEach(function (group) {
            var items = group.querySelectorAll(".dish-list li");
            var hasVisible = false;

            items.forEach(function (item) {
                var match = !query || normalizeText(item.textContent).indexOf(query) !== -1;
                item.style.display = match ? "" : "none";

                if (match) {
                    hasVisible = true;
                    visibleItems += 1;
                }
            });

            group.style.display = hasVisible ? "" : "none";
        });

        if (!feedback) {
            return;
        }

        if (!query) {
            feedback.textContent = "Digite para filtrar os itens do bar.";
        } else if (visibleItems === 0) {
            feedback.textContent = "Nenhuma bebida encontrada para essa busca.";
        } else {
            feedback.textContent = "Itens encontrados: " + visibleItems + ".";
        }
    }

    function showCategory(category) {
        categories.forEach(function (section) {
            var isTarget = section.getAttribute("data-category") === category;
            section.classList.toggle("is-visible", isTarget);
        });

        categoryButtons.forEach(function (button) {
            var isTarget = button.getAttribute("data-category") === category;
            button.classList.toggle("is-active", isTarget);
        });

        applyDrinkFilter();
    }

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            showCategory(button.getAttribute("data-category"));
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", applyDrinkFilter);
    }

    showCategory("petiscos");
})();