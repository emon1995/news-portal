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
  //   console.log(categories);
  const categoriesSection = document.getElementById("ul");
  categories.forEach((category) => {
    const li = document.createElement("li");
    // li.onclick = categoriesItems;
    // li.classList.add("w-full");
    // console.log(category.category_name);
    li.innerHTML = `
    <a onclick="categoriesItems('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
    `;
    categoriesSection.appendChild(li);
  });
};

const categoriesItems = async (category_id, category_name) => {
  console.log("click", category_id, category_name);

  try {
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(URL);
    const data = await res.json();
    showCategoriesItems(data.data, category_name);
  } catch (error) {
    console.log(error);
  }
};

const showCategoriesItems = (categoriesItems, category_name) => {
  //   console.log(categoriesItems);
  const categoryItems = document.getElementById("items");
  const categoryName = document.getElementById("categories-name");
  const cardSection = document.getElementById("card-section");
  cardSection.innerHTML = "";

  categoriesItems.forEach((category) => {
    const card = document.createElement("div");
    card.classList.add("card", "card-side", "bg-base-100", "shadow-xl", "mb-4");
    card.innerHTML = `
    <figure>
            <img
            class="w-full h-[300px]"
              src="${category.image_url}"
              alt="Movie"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${category.title}</h2>
            <p>${category.details.slice(0, 100)}...</p>
            <div class="card-actions items-center gap-4 justify-between">
              <!-- author -->
              <div class="flex gap-2">
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src="${category.author.img}" />
                  </div>
                </div>
                <div>
                  <h2>${category.author.name}</h2>
                  <p>${category.author.published_date}</p>
                </div>
              </div>
              <!-- watch -->
              <div class="flex gap-2">
                <i class="fa-regular fa-eye"></i>
                <p>${category.total_view ? category.total_view : "No View"}M</p>
              </div>
              <!-- star -->
              <div>
                <div class="rating">
                  <input type="radio" name="rating-1" class="mask mask-star" />
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                    checked
                  />
                  <input type="radio" name="rating-1" class="mask mask-star" />
                  <input type="radio" name="rating-1" class="mask mask-star" />
                  <input type="radio" name="rating-1" class="mask mask-star" />
                </div>
              </div>
              <!-- details btn -->
              <div>
                <button class="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
    `;
    cardSection.appendChild(card);
  });
  categoryName.innerText = category_name;
  categoryItems.innerText =
    categoriesItems.length === 0 ? 0 : categoriesItems.length;
};
