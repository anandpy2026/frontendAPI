# Frontend Setup - Navigation & Module Management

## ✅ What Has Been Created

### 1. **Navigation Bar** (Multi-Module Navigation)
   - **Location**: Integrated in all pages (user.html, customer.html, plan.html, product.html)
   - **Features**:
     - Navigation links to switch between modules: User, Customer, Plan, Product
     - Dropdown menu for "More" options (Invoice, Report, Logout)
     - Responsive design for mobile devices
     - Active state indicator showing current page
     - Modern gradient styling matching your existing design

### 2. **HTML Pages Created**
   - ✅ `customer.html` - Customer Management module
   - ✅ `plan.html` - Plan/Subscription Management module
   - ✅ `product.html` - Product Management module
   - ✅ Updated `user.html` - Added multi-module navigation bar
   - ✅ `navbar.html` - Reusable navbar component (reference)

### 3. **JavaScript Controllers Created**
   - ✅ `js/customer.js` - AngularJS controller for Customer operations
   - ✅ `js/plan.js` - AngularJS controller for Plan operations
   - ✅ `js/product.js` - AngularJS controller for Product operations

---

## 🔄 API Endpoints You Need to Create/Modify

All controllers are configured to use these endpoints. Update your backend accordingly:

### **Customer API Endpoints**
```
Base URL: http://localhost:3000/api/customers

- GET /api/customers              → Get all customers
- POST /api/customers             → Create new customer
- PUT /api/customers/:id          → Update customer
- DELETE /api/customers/:id       → Delete customer
```

**Customer Model (add password field):**
```javascript
{
    id: Number,
    name: String (required),
    email: String (required, unique),
    phone: String,
    company: String,
    address: String,
    city: String,
    password: String (required, hash in backend),
    status: String ('active' or 'inactive'),
    createdAt: Date,
    updatedAt: Date
}
```

### **Plan API Endpoints**
```
Base URL: http://localhost:3000/api/plans

- GET /api/plans                  → Get all plans
- POST /api/plans                 → Create new plan
- PUT /api/plans/:id              → Update plan
- DELETE /api/plans/:id           → Delete plan
```

**Plan Model:**
```javascript
{
    id: Number,
    name: String (required),
    description: String,
    price: Number (required),
    duration: Number (months, required),
    maxUsers: Number,
    features: String,
    status: String ('active' or 'inactive'),
    createdAt: Date,
    updatedAt: Date
}
```

### **Product API Endpoints**
```
Base URL: http://localhost:3000/api/products

- GET /api/products               → Get all products
- POST /api/products              → Create new product
- PUT /api/products/:id           → Update product
- DELETE /api/products/:id        → Delete product
```

**Product Model:**
```javascript
{
    id: Number,
    name: String (required),
    sku: String (required, unique),
    description: String,
    price: Number (required),
    stock: Number,
    category: String,
    password: String (required, hash in backend),
    status: String ('active' or 'inactive'),
    createdAt: Date,
    updatedAt: Date
}
```

### **User API Endpoints** (Update existing)
```
Base URL: http://localhost:3000/api/users

- GET /api/users                  → Get all users (exclude password)
- POST /api/users                 → Create new user (with password)
- PUT /api/users/:id              → Update user
- DELETE /api/users/:id           → Delete user
```

**User Model (add password field):**
```javascript
{
    id: Number,
    name: String (required),
    email: String (required, unique),
    phone: String,
    address: String,
    password: String (required, hash in backend),
    createdAt: Date,
    updatedAt: Date
}
```

---

## ⚠️ Important Backend Requirements

### **1. Password Security**
- **Hash passwords** using bcrypt or similar (NEVER store plain text)
- **Remove password field** from API responses when displaying user/customer details
- Only include password in creation endpoints

### **2. CORS Configuration**
Make sure your Express backend has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors());
```

### **3. Error Handling**
All controllers expect error responses in format:
```javascript
{
    message: "Error description"
}
```

### **4. Success Responses**
Controllers expect responses in these formats:

**For GET requests:**
```javascript
// Array of objects
[
    { id: 1, name: "Item 1", ... },
    { id: 2, name: "Item 2", ... }
]
```

**For POST/PUT requests:**
```javascript
{
    id: 1,
    name: "Item",
    ...
}
```

---

## 📋 Form Fields by Module

### **User Form**
- Name (required, text)
- Email (required, email)
- Phone (text)
- Address (text)
- Password (required, password) - *Add to form*

### **Customer Form**
- Customer Name (required, text)
- Email (required, email)
- Phone (text)
- Company (text)
- Address (textarea)
- City (text)
- Status (select: active/inactive)
- Password (required, password) - *Add to form*

### **Plan Form**
- Plan Name (required, text)
- Description (textarea)
- Price (required, number)
- Duration in months (required, number)
- Max Users (number)
- Features (textarea)
- Status (select: active/inactive)

### **Product Form**
- Product Name (required, text)
- SKU (required, text)
- Description (textarea)
- Price (required, number)
- Stock Quantity (number)
- Category (text)
- Status (select: active/inactive)

---

## 🚀 Next Steps

1. **Update User & Customer Models** in your backend to include password field
2. **Create API Endpoints** for Customer, Plan, and Product modules
3. **Implement Password Hashing** - hash passwords before storing, exclude from responses
4. **Test API Endpoints** using Postman or similar
5. **Ensure CORS** is properly configured
6. **Update user.js** (optional) to include password field in the form

---

## 📁 Current File Structure
```
frontend/
├── index.html (User Management - Updated with navbar)
├── customer.html (New)
├── plan.html (New)
├── product.html (New)
├── navbar.html (Reference component)
├── js/
│   ├── user.js (existing)
│   ├── customer.js (New)
│   ├── plan.js (New)
│   └── product.js (New)
└── css/ (if you want to extract styles)
```

---

**Ready to proceed!** Share your updated API endpoints and models when ready, and I'll help you integrate them.


python -m http.server 8080
bash -lc '/home/labuser/Desktop/Policy/RestAPI/venv/bin/python /home/labuser/Desktop/Policy/RestAPI/restapi/manage.py runserver 0.0.0.0:8000'

username: admin@test.com
pass: admin123