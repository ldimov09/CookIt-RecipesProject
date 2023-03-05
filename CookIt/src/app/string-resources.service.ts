import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringResourcesService {

  data = [
    {
      "id": "contact",
      "val": {
        "en": "Contact us", 
        "bg": "Свържете се"
      }
    },
    {
      "id": "irreversable",
      "val": {
        "en": "Are you sure you want to delete this recipe? This action is irreversible",
        "bg": "Сигурни ли стече искате да изтриете тази рецепта? Това действие е необратимо!"
      }
    },
    {
      "id": "cancel",
      "val": {
        "en": "Cancel",
        "bg": "Отказ"
      }
    },
    {
      "id": "confirm",
      "val": {
        "en": "Confirm action",
        "bg": "Потвърждаване на действие"
      }
    },
    {
      "id": "user",
      "val": {
        "en": "user",
        "bg": "потребител"
      }
    },
    {
      "id": "admin",
      "val": {
        "en": "admin",
        "bg": "администратор"
      }
    },
    {
      "id": "superadmin",
      "val": {
        "en": "superadmin",
        "bg": "суперадминистратор"
      }
    },
    {
      "id": "edit_your_recipe",
      "val": {
        "en": "Edit your recipe",
        "bg": "Промени своя рецепта"
      }
    },
    {
      "id": "servings_1_por",
      "val": {
        "en": "Servings have to be at least 1 portion.",
        "bg": "Минималният брой порции е една. "
      }
    },
    {
      "id": "choose_tag",
      "val": {
        "en": "Choose tag",
        "bg": "Изберете таг"
      }
    },
    {
      "id": "no_recipes_found",
      "val": {
        "en": "No recipes match your search.",
        "bg": "Няма намерени рецепти."
      }
    },
    {
      "id": "loading",
      "val": {
        "en": "Loading...",
        "bg": "Зареждане..."
      }
    },
    {
      "id": "guest",
      "val": {
        "en": "Guest",
        "bg": "Гост"
      }
    },
    {
      "id": "home",
      "val": {
        "en": "Home",
        "bg": "Начало"
      }
    },
    {
      "id": "about",
      "val": {
        "en": "About us",
        "bg": "За нас"
      }
    },
    {
      "id": "recipes",
      "val": {
        "en": "Recipes",
        "bg": "Рецепти"
      }
    },
    {
      "id": "logout",
      "val": {
        "en": "Logout",
        "bg": "Излезте"
      }
    },
    {
      "id": "favorites",
      "val": {
        "en": "Favorites",
        "bg": "Любими"
      }
    },
    {
      "id": "create_recipe",
      "val": {
        "en": "Create Recipe",
        "bg": "Създай Рецепта"
      }
    },
    {
      "id": "welcome",
      "val": {
        "en": "Welcome",
        "bg": "Здравейте"
      }
    },
    {
      "id": "newest_recipes",
      "val": {
        "en": "Newest Recipes",
        "bg": "Последно добавени рецепти"
      }
    },
    {
      "id": "servings",
      "val": {
        "en": "servings",
        "bg": "порции"
      }
    },
    {
      "id": "cook_time",
      "val": {
        "en": "Cook Time",
        "bg": "време готв."
      }
    },
    {
      "id": "min",
      "val": {
        "en": "min",
        "bg": "мин."
      }
    },
    {
      "id": "recipes",
      "val": {
        "en": "Recipes",
        "bg": "Рецепти"
      }
    },
    {
      "id": "search_for",
      "val": {
        "en": "Search For",
        "bg": "Търси за"
      }
    },
    {
      "id": "search",
      "val": {
        "en": "Search",
        "bg": "Търси"
      }
    },
    {
      "id": "show_all",
      "val": {
        "en": "Show All",
        "bg": "Покажи всички"
      }
    },
    {
      "id": "back_to",
      "val": {
        "en": "Back to",
        "bg": "Обратно към"
      }
    },
    {
      "id": "admin",
      "val": {
        "en": "Admin",
        "bg": "Админ"
      }
    },
    {
      "id": "edit",
      "val": {
        "en": "Edit",
        "bg": "Промени"
      }
    },
    {
      "id": "delete",
      "val": {
        "en": "Delete",
        "bg": "Изтрий"
      }
    },
    {
      "id": "ingredients",
      "val": {
        "en": "Ingredients",
        "bg": "Съставки"
      }
    },
    {
      "id": "instructions",
      "val": {
        "en": "Instructions",
        "bg": "Начин на приготвяне"
      }
    },
    {
      "id": "create_your_recipe",
      "val": {
        "en": "Create your recipe",
        "bg": "Създай своя рецепта"
      }
    },
    {
      "id": "title",
      "val": {
        "en": "Title",
        "bg": "Заглавие"
      }
    },
    {
      "id": "add_tag",
      "val": {
        "en": "Add Tag",
        "bg": "Добави таг"
      }
    },
    {
      "id": "ingredient",
      "val": {
        "en": "Ingredient",
        "bg": "Съставка"
      }
    },
    {
      "id": "add_ingredient",
      "val": {
        "en": "Add Ingredient",
        "bg": "Добави съставка"
      }
    },
    {
      "id": "image_link",
      "val": {
        "en": "Image Link",
        "bg": "Връзка към изображение"
      }
    },
    {
      "id": "minutes",
      "val": {
        "en": "minutes",
        "bg": "минути"
      }
    },
    {
      "id": "create",
      "val": {
        "en": "Create",
        "bg": "Създай"
      }
    },
    {
      "id": "login_here",
      "val": {
        "en": "Login Here",
        "bg": "Влезте оттук"
      }
    },
    {
      "id": "email_address",
      "val": {
        "en": "Email address",
        "bg": "Електронна поща"
      }
    },
    {
      "id": "is_required",
      "val": {
        "en": "is required",
        "bg": "е задължително поле"
      }
    },
    {
      "id": "password",
      "val": {
        "en": "Password",
        "bg": "Парола"
      }
    },
    {
      "id": "login",
      "val": {
        "en": "Login",
        "bg": "Влезте"
      }
    },
    {
      "id": "register_here",
      "val": {
        "en": "Register Here",
        "bg": "Регистрирайте се оттук"
      }
    },
    {
      "id": "username",
      "val": {
        "en": "Username",
        "bg": "Потребителско име"
      }
    },
    {
      "id": "repeat_password",
      "val": {
        "en": "Repeat Password",
        "bg": "Повторете паролата"
      }
    },
    {
      "id": "invalid_email",
      "val": {
        "en": "Invalid email",
        "bg": "Невалидна електронна поща"
      }
    },
    {
      "id": "passwords_do_not_march",
      "val": {
        "en": "Passwords do not match.",
        "bg": "Паролите не съвпадат."
      }
    },
    {
      "id": "register",
      "val": {
        "en": "Register",
        "bg": "Регистрирайте се"
      }
    },


    {
      "id": "home_page_text",
      "val": {
        "en": "Welcome to CookIt! Here you will find delicious and easy recipes for every occasion. You'll find it here whether you're looking for a quick weeknight dinner, a special holiday feast, or a creative snack for your kids. Our app is designed with busy home cooks in mind, so you can find exactly what you need in no time. Plus, you can save your favorite recipes. So get cooking and enjoy the delicious recipes!",
        "bg": "Добре дошли в CookIt! Тук ще намерите вкусни и лесни рецепти за всеки повод. Ще го намерите тук, независимо дали търсите бърза делнична вечеря, специален празничен празник или креативна закуска за вашите деца. Нашето приложение е създадено с оглед на заетите домашни готвачи, така че можете да намерите точно това, от което се нуждаете за нула време. Освен това можете да запазите любимите си рецепти. Така че започнете да готвите и се насладете на вкусните рецепти!"
      }
    },
    {
      "id": "about_page_text",
      "val": {
        "en": "Welcome to CookIt, where cooking and food come together in the tastiest way possible. Our mission is to inspire and help home cooks to create delicious and healthy meals for their families and friends. That's why we publish easy-to-follow recipes all aimed at making cooking accessible to everyone. Our team of experts tests every recipe to ensure it is delicious, healthy, and achievable in the home kitchen. We are always on the lookout for new recipes, cooking techniques, and ingredients, so you can be sure you're getting the latest and greatest in the world of cooking. CookIt is not just a recipe platform, it's a community. We encourage you to share your own recipes, ask questions, and connect with other food lovers. Whether you're an experienced cook or just starting out, CookIt is the place for you. So why not join us on this culinary journey and discover the joys of cooking with CookIt!",
        "bg": "Добре дошли в CookIt, където готвенето и храната се обединяват по възможно най-вкусния начин. Нашата мисия е да вдъхновяваме и помагаме на домашните готвачи да създават вкусни и здравословни ястия за своите семейства и приятели. Ето защо ние публикуваме лесни за изпълнение рецепти, целящи да направят готвенето достъпно за всеки. Нашият екип от експерти тества всяка рецепта, за да гарантира, че е вкусна, здравословна и постижима в домашната кухня. Винаги сме в търсене на нови рецепти, техники за готвене и съставки, така че можете да сте сигурни, че получавате най-новото и най-доброто в света на готвенето. CookIt не е просто платформа за рецепти, това е общност. Препоръчваме ви да споделяте свои собствени рецепти, да задавате въпроси и да се свързвате с други любители на храната. Независимо дали сте опитен готвач или тепърва започвате, CookIt е мястото за вас. Така че защо не се присъедините към нас в това кулинарно пътешествие и не откриете радостта от готвенето с CookIt!"
      }
    },


    {
      "id": "users",
      "val": {
        "en": "Users",
        "bg": "Потребители"
      }
    },
    {
      "id": "tags",
      "val": {
        "en": "Tags",
        "bg": "Тагове"
      }
    },
    {
      "id": "user_list",
      "val": {
        "en": "User List",
        "bg": "Списък с потребители"
      }
    },
    {
      "id": "promote",
      "val": {
        "en": "Promote",
        "bg": "Повиши"
      }
    },
    {
      "id": "demote",
      "val": {
        "en": "Demote",
        "bg": "Понижи"
      }
    },
    {
      "id": "permanent",
      "val": {
        "en": "Permanent",
        "bg": "Постоянен"
      }
    },
    {
      "id": "recipe_list",
      "val": {
        "en": "Recipe List",
        "bg": "Списък с рецепти"
      }
    },
    {
      "id": "create_new_tag",
      "val": {
        "en": "Create New Tag",
        "bg": "Създай нов таг"
      }
    },
    {
      "id": "edit_tag",
      "val": {
        "en": "Edit Tag",
        "bg": "Редактирай таг"
      }
    },
    {
      "id": "name",
      "val": {
        "en": "Name",
        "bg": "Име"
      }
    },
    {
      "id": "incompatible",
      "val": {
        "en": "Incompatible",
        "bg": "Несъвместими"
      }
    },
    {
      "id": "incorrect_login",
      "val": {
        "en": "Incorrect email or password!",
        "bg": "Грешна електронна поща или парола."
      }
    }
  ]

  lang = 'bg'

  constructor() { }

  getResource(stringId: string) {
    const filtered = this.data.filter(el => {
      if(el.id === stringId){
        return true;
      }
      return false;
    })

    if(filtered.length > 0){
      if(this.lang == "bg") return filtered[0].val.bg;
      return filtered[0].val.en;
    }

    return "N/A";

  }

  getLang() {
    return this.lang;
  }
  
}
