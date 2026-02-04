require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authController = require('./controllers/authController');
const inventoryController = require('./controllers/inventoryController');
const userManagementController = require('./controllers/userManagementController');
const masterConfigurationController = require('./controllers/masterConfigurationController');
const dashboardController = require('./controllers/dashboardController');
const authenticateToken = require('./middleware/auth');

const multer = require('multer');
const upload = multer();

const app = express();
const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://pratham-guru-enterprises.vercel.app"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/register', authController.register);
app.post('/token', upload.none(), authController.login);

// Inventory Routes
app.get('/inventory/products', inventoryController.getAllProducts);
app.post('/inventory/products', inventoryController.createProduct);
app.delete('/inventory/products/:id', inventoryController.deleteProduct);
app.get('/inventory/production/:date', inventoryController.getDailyProduction);
app.post('/inventory/production', inventoryController.saveDailyProduction);
app.delete('/inventory/production/:date', inventoryController.deleteDailyProduction);

// User Management Routes
app.get('/users/role/:role', authenticateToken, userManagementController.getUsersByRole);
app.get('/users/recent', authenticateToken, userManagementController.getRecentUsers);
app.post('/users/with-role', authenticateToken, userManagementController.createUserWithRole);
app.delete('/users/:id', authenticateToken, userManagementController.deleteUser);
app.get('/dashboard/stats', authenticateToken, dashboardController.getDashboardStats);
app.get('/artisans', authenticateToken, userManagementController.getAllArtisans);
app.post('/artisans', authenticateToken, userManagementController.createArtisan);
app.put('/artisans/:id', authenticateToken, userManagementController.updateArtisan);
app.delete('/artisans/:id', authenticateToken, userManagementController.deleteArtisan);

// Master Configuration Routes
app.put('/products/:id', authenticateToken, masterConfigurationController.updateProduct);
app.get('/products/:productId/variants', authenticateToken, masterConfigurationController.getVariantsByProduct);
app.post('/variants', authenticateToken, masterConfigurationController.createVariant);
app.delete('/variants/:id', authenticateToken, masterConfigurationController.deleteVariant);
app.get('/products/:productId/rate-history', authenticateToken, masterConfigurationController.getRateHistory);

app.get('/users/me', authenticateToken, authController.getMe);

// Health check
app.get('/', (req, res) => {
    res.json({ status: "ok", message: "Node.js Backend Running" });
});

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
