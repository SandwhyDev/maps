const foodData = [
  { name: "Pizza", category: "Italian" },
  { name: "Burger", category: "American" },
  { name: "Pasta", category: "Italian" },
  { name: "Salad", category: "Healthy" },
  { name: "Sushi", category: "Japanese" },
  { name: "Tacos", category: "Mexican" },
  { name: "Steak", category: "American" },
  { name: "Sandwich", category: "American" },
  { name: "Soup", category: "Healthy" },
  { name: "Ramen", category: "Japanese" },
  { name: "Curry", category: "Indian" },
  { name: "Fried Chicken", category: "American" },
  { name: "Shrimp", category: "Seafood" },
  { name: "Ice Cream", category: "Dessert" },
  { name: "Cake", category: "Dessert" },
  { name: "Pancakes", category: "Breakfast" },
];

function search() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const foodList = document.getElementById("foodList");
  foodList.innerHTML = "";
  for (let i = 0; i < foodData.length; i++) {
    const food = foodData[i];
    console.log(food.name);
    if (food.name.toUpperCase().indexOf(filter) > -1) {
      const li = document.createElement("li");
      li.textContent = `${food.name} - ${food.category}`;
      li.classList.add(
        "px-4",
        "py-2",
        "bg-white",
        "border",
        "border-gray-300",
        "rounded-md"
      );
      foodList.appendChild(li);
    }
  }
}
