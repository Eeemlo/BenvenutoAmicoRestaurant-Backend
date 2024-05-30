# API - Benventuo Amico

Detta repository innehåller kod för ett REST API byggt med NodeJs och Express. APIet är byggt för att hantera användare, menyer och bordsbokningar för en restaurang. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: [https://projekt-auth.onrender.com](https://projekt-auth.onrender.com)

## Installation och databas
APIet använder en MongoDB-databas. För att installera och köra APIet, följ stegen nedan:

1. Klona ner källkodsfilerna.
2. Kör kommandot `npm install` för att installera nödvändiga npm-paket.
3. Skapa en `.env`-fil i projektets rotkatalog med följande variabler:

DATABASE_URL=din_mongodb_url
JWT_SECRET=din_hemliga_nyckel

4. Starta servern med kommandot `npm start` (eller `npm run start` om du använder nodemon).

### Databastabeller
APIet använder följande MongoDB-scheman:

#### Table Schema
```javascript
const tableSchema = new mongoose.Schema({
 fullname: { type: String, required: true, trim: true },
 email: { type: String, required: true },
 date: { type: Date, required: true },
 quantity: { type: Number, required: true },
 created: { type: Date, default: Date.now }
});

const dinnerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    vegetarian: { type: Boolean },
    vegan: { type: Boolean },
    created: { type: Date, default: Date.now }
});

const lunchSchema = new mongoose.Schema({
    week: { type: Number, required: true, trim: true },
    weekday: { type: String, required: true },
    description1: { type: String, required: true },
    description2: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

const takeAwaySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    created: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
});
```

## Användning
Nedan finns beskrivet hur man når APIet på olika vis:

### Publika Endpoints

| Metod         | Ändpunkt     | Beskrivning |
|--------------|-----------|------------|
| GET | /api/users      | Hämtar alla användare     |
| GET      | /api/users/user  | Hämtar en specifik användare.     |
|POST|/api/register|Registrerar en ny användare.|
|POST|/api/login| Loggar in användare och returnerar en JWT-token.|
|GET| /api/dinners| Hämtar middagsmenyn.|
|GET| /api/lunches| Hämtar lunchmenyn.|
|GET| /api/takeaways| Hämtar takeaway-menyn.|
|GET| /api/bookings | Hämtar alla bordsbokningar.|

## Exempel på JSON-objekt i API:et

### Användarobjekt
```javascript
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "hashed_password"
}
```
### Middagsmenyobjekt
```javascript
{
    "name": "Spaghetti Carbonara",
    "category": "Main Course",
    "description": "Classic Italian pasta dish",
    "price": 99,
    "vegetarian": false,
    "vegan": false
}
```
### Lunchmenyobjekt
```javascript
{
    "week": 23,
    "weekday": "Monday",
    "description1": "Grilled Chicken",
    "description2": "Vegetable Stir Fry"
}
```
### Takeawaymenyobjekt
```javascript
{
    "name": "Burger Meal",
    "category": "Fast Food",
    "description": "Cheeseburger with fries",
    "price": 99
}
```
### Bordsbokningsobjekt
```javascript
{
    "fullname": "Jane Doe",
    "email": "jane@example.com",
    "date": "2023-05-30T19:00:00.000Z",
    "quantity": 2
}
```

