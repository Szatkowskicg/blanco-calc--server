const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Dodaj obsługę CORS
app.use(bodyParser.json());

// Ścieżki do plików JSON
const INVOICES_FILE = 'invoices.json';
const INVOICES_PAID_FILE = 'invoices-paid.json';
const ORDERS_PLACED_FILE = 'orders-placed.json';
const ORDERS_FILE = 'orders-draft.json';

// Funkcje pomocnicze do odczytu i zapisu plików JSON
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};
const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Endpointy do obsługi faktur (INVOICES)
app.get('/invoices', async (req, res) => {
    try {
        const invoices = await readJsonFile(INVOICES_FILE);
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: 'Error reading invoices file' });
    }
});

app.post('/invoices', async (req, res) => {
    try {
        const invoices = await readJsonFile(INVOICES_FILE);
        invoices.push(req.body);
        await writeJsonFile(INVOICES_FILE, invoices);
        res.status(201).json({ message: 'Invoice added' });
    } catch (err) {
        res.status(500).json({ error: 'Error writing invoices file' });
    }
});

app.delete('/invoices/:id', async (req, res) => {
    try {
        const invoices = await readJsonFile(INVOICES_FILE);
        const updatedInvoices = invoices.filter(invoice => invoice.id !== req.params.id);
        await writeJsonFile(INVOICES_FILE, updatedInvoices);
        res.status(200).json({ message: 'Invoice removed' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating invoices file' });
    }
});

// Endpointy do obsługi faktur (INVOICES_PAID)
app.get('/invoices-paid', async (req, res) => {
    try {
        const invoices = await readJsonFile(INVOICES_PAID_FILE);
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: 'Error reading invoices file' });
    }
});

app.post('/invoices-paid', async (req, res) => {
    try {
        const invoices = await readJsonFile(INVOICES_PAID_FILE);
        invoices.push(req.body);
        await writeJsonFile(INVOICES_PAID_FILE, invoices);
        res.status(201).json({ message: 'Invoice added' });
    } catch (err) {
        res.status(500).json({ error: 'Error writing invoices file' });
    }
});

app.delete('/invoices-paid/:id', async (req, res) => {
    try {
        const invoices = await readJsonFile(INVOICES_PAID_FILE);
        const updatedInvoices = invoices.filter(invoice => invoice.id !== req.params.id);
        await writeJsonFile(INVOICES_PAID_FILE, updatedInvoices);
        res.status(200).json({ message: 'Invoice removed' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating invoices file' });
    }
});

// Endpointy do obsługi zamówień złożonych (ORDERS_PLACED)
app.get('/orders-placed', async (req, res) => {
    try {
        const orders = await readJsonFile(ORDERS_PLACED_FILE);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Error reading orders file' });
    }
});

app.post('/orders-placed', async (req, res) => {
    try {
        const orders = await readJsonFile(ORDERS_PLACED_FILE);
        orders.push(req.body);
        await writeJsonFile(ORDERS_PLACED_FILE, orders);
        res.status(201).json({ message: 'Order added' });
    } catch (err) {
        res.status(500).json({ error: 'Error writing orders file' });
    }
});

app.delete('/orders-placed/:id', async (req, res) => {
    try {
        const orders = await readJsonFile(ORDERS_PLACED_FILE);
        const updatedOrders = orders.filter(orders => orders.id !== req.params.id);
        await writeJsonFile(ORDERS_PLACED_FILE, updatedOrders);
        res.status(200).json({ message: 'Order removed' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating orders file' });
    }
});

// Endpointy do obsługi zamówień (ORDERS)
app.get('/orders', async (req, res) => {
    try {
        const orders = await readJsonFile(ORDERS_FILE);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Error reading orders file' });
    }
});

app.post('/orders', async (req, res) => {
    try {
        const orders = await readJsonFile(ORDERS_FILE);
        orders.push(req.body);
        await writeJsonFile(ORDERS_FILE, orders);
        res.status(201).json({ message: 'Order added' });
    } catch (err) {
        res.status(500).json({ error: 'Error writing orders file' });
    }
});

app.delete('/orders/:id', async (req, res) => {
    try {
        const orders = await readJsonFile(ORDERS_FILE);
        const updatedOrders = orders.filter(order => order.id !== req.params.id);
        await writeJsonFile(ORDERS_FILE, updatedOrders);
        res.status(200).json({ message: 'Order removed' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating orders file' });
    }
});

// Endpoint główny
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});