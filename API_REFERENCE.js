// Backend API Structure Reference
// This file shows the expected API structure for all modules

// ============================================
// 1. USER MODULE
// ============================================

/*
GET /api/users
Response: [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        // PASSWORD NOT INCLUDED IN RESPONSE
        created_at: "2024-01-01T10:00:00Z"
    }
]

POST /api/users
Request body: {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    password: "securePassword123"  // Will be hashed
}
Response: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    created_at: "2024-01-01T10:00:00Z"
}

PUT /api/users/:id
Request body: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "987-654-3210",
    address: "456 Oak Ave"
    // Optional password update
}
Response: Same as POST

DELETE /api/users/:id
Response: { message: "User deleted successfully" }
*/

// ============================================
// 2. CUSTOMER MODULE
// ============================================

/*
GET /api/customers
Response: [
    {
        id: 1,
        name: "Acme Corp",
        email: "contact@acme.com",
        phone: "555-1234",
        company: "Acme Corporation",
        address: "789 Business Blvd",
        city: "New York",
        status: "active",
        // PASSWORD NOT INCLUDED IN RESPONSE
        created_at: "2024-01-01T10:00:00Z"
    }
]

POST /api/customers
Request body: {
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "555-1234",
    company: "Acme Corporation",
    address: "789 Business Blvd",
    city: "New York",
    password: "customerPassword123",  // Will be hashed
    status: "active"
}
Response: {
    id: 1,
    name: "Acme Corp",
    email: "contact@acme.com",
    ...
}

PUT /api/customers/:id
Request body: Same as POST (optional fields)

DELETE /api/customers/:id
Response: { message: "Customer deleted successfully" }
*/

// ============================================
// 3. PLAN MODULE
// ============================================

/*
GET /api/plans
Response: [
    {
        id: 1,
        name: "Basic Plan",
        description: "Perfect for startups",
        price: 29.99,
        duration: 12,
        maxUsers: 5,
        features: "Feature1, Feature2, Feature3",
        status: "active",
        created_at: "2024-01-01T10:00:00Z"
    }
]

POST /api/plans
Request body: {
    name: "Basic Plan",
    description: "Perfect for startups",
    price: 29.99,
    duration: 12,
    maxUsers: 5,
    features: "Feature1, Feature2, Feature3",
    status: "active"
}
Response: {
    id: 1,
    ...
}

PUT /api/plans/:id
Request body: Same as POST (optional fields)

DELETE /api/plans/:id
Response: { message: "Plan deleted successfully" }
*/

// ============================================
// 4. PRODUCT MODULE
// ============================================

/*
GET /api/products
Response: [
    {
        id: 1,
        name: "Laptop",
        sku: "LAP-001",
        description: "High performance laptop",
        price: 999.99,
        stock: 50,
        category: "Electronics",
        status: "active",
        created_at: "2024-01-01T10:00:00Z"
    }
]

POST /api/products
Request body: {
    name: "Laptop",
    sku: "LAP-001",
    description: "High performance laptop",
    price: 999.99,
    stock: 50,
    category: "Electronics",
    status: "active"
}
Response: {
    id: 1,
    ...
}

PUT /api/products/:id
Request body: Same as POST (optional fields)

DELETE /api/products/:id
Response: { message: "Product deleted successfully" }
*/

// ============================================
// ERROR RESPONSES (Same for all endpoints)
// ============================================

/*
400 Bad Request:
{
    message: "Validation error message"
}

404 Not Found:
{
    message: "Resource not found"
}

409 Conflict:
{
    message: "Email already exists"
}

500 Server Error:
{
    message: "Internal server error"
}
*/

// ============================================
// IMPORTANT NOTES
// ============================================

/*
1. PASSWORD FIELD:
   - ALWAYS hash passwords using bcrypt or similar
   - NEVER send plain passwords in responses
   - Remove password field from all GET responses
   - Include password in POST requests only

2. CORS CONFIGURATION:
   app.use(cors());

3. DATABASE RELATIONSHIPS (Optional):
   - Customer can have multiple Orders
   - User can have multiple Actions
   - Plan can be associated with Customers
   - Product can be in multiple Orders

4. VALIDATION:
   - All "required" fields must be validated
   - Email should be unique (check database)
   - SKU should be unique (for products)

5. STATUS CODES:
   - 200: GET, PUT, DELETE success
   - 201: POST success (optional, 200 also works)
   - 400: Validation error
   - 404: Not found
   - 409: Conflict (duplicate unique field)
   - 500: Server error
*/
