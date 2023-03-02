const getCategories = async () => {
  const URL = `https://openapi.programming-hero.com/api/news/categories`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    showCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

const showCategories = (categories) => {
  console.log(categories);
  const categoriesSection = document.getElementById("ul");
  categories.forEach((category) => {
    const li = document.createElement("li");
    // li.classList.add("w-full");
    console.log(category.category_name);
    li.innerHTML = `
    <a>${category.category_name}</a>
    `;
    categoriesSection.appendChild(li);
  });
};
