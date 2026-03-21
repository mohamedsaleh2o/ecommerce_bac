# E-Commerce Backend (Node.js + Express)

This is a production-ready backend built with Clean Architecture specifically for a Flutter E-commerce application. It features authentication, product catalog management, category filtering, and cart functionality natively mirroring the Flutter models.

## 🚀 Technologies

- **Node.js + Express.js** for the API framework.
- **MongoDB + Mongoose** for the database and schemas.
- **JWT (JSON Web Tokens)** for secure, stateless authentication.
- **Bcrypt** for secure password hashing.
- **Joi** for strict request validation.

## 📁 Project Structure (Clean Architecture)

```text
src/
 ┣ config/           # Configuration files
 ┣ controllers/      # Route handlers (Auth, Product, Cart, Category)
 ┣ middlewares/      # Custom middlewares (Auth, Error Handling, Validation)
 ┣ models/           # Mongoose schemas (matching Flutter models exactly)
 ┣ routes/           # Express routers
 ┣ services/         # Business logic layer
 ┣ utils/            # Utilities (CatchAsync, Logger, Response Formatters)
 ┣ app.js            # Express app setup and middleware registration
 ┗ server.js         # Entry point and DB connection
```

## 🛠️ Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory (you can copy `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce_db
   JWT_SECRET=super_secret_jwt_key_change_me_in_production
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```
   > **Note:** If you do not have a live MongoDB URI, the server has been configured to automatically fall back to an in-memory MongoDB instance for local testing if you run it with `USE_MEMORY_DB=true`.

3. **Run the Server:**
   - **Development (nodemon):**
     ```bash
     npm run dev
     ```
   - **Production:**
     ```bash
     npm start
     ```

## 📡 API Endpoints

All responses follow a standard format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

### 1. Authentication
- `POST /api/auth/register` - Register a new user (Creates empty cart automatically).
- `POST /api/auth/login` - Login to receive a JWT token.

### 2. Products
Matches the exact `ProductResponseModel` used in Flutter.
- `GET /api/products` - Get all products (Supports `?category=...`, `?search=...`, `?page=...`).
- `GET /api/products/:id` - Get a single product by its integer ID.
- `POST /api/products` - Create a new product.
- `PUT /api/products/:id` - Update an existing product.
- `DELETE /api/products/:id` - Delete a product.

### 3. Categories
- `GET /api/categories` - Returns a distinct list of strings containing all available categories.
- `GET /api/categories/:category` - Returns all products under a specific category.

### 4. Cart (Requires `Authorization: Bearer <token>`)
Users' carts are automatically attached to their user accounts.
- `GET /api/cart` - View current user's cart (Populates product details and totals).
- `POST /api/cart/add` - Add a product to the cart (Expects `productId`, `quantity`).
- `POST /api/cart/remove` - Remove a product completely.
- `PUT /api/cart/update` - Update the specific quantity of a product in the cart.
# ecommerce_backend
