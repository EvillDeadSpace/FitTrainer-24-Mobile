const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const app = express();
const PORT = process.env.PORT || 3000;
const ServerlessHttp = require('serverless-http');

const jwt = require('jsonwebtoken');

// Definisanje šeme za korisnika
const orderSchema = new Schema({
    trainer: { type: String, required: false },
    confirmed: { type: Boolean, default: false }
});

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    image: String,
    role: String,
    price: Number,
    specialization: String,
    description: String,
    duration: Number,
    premium: Boolean,
    day: Number,
    orders: {
        type: [orderSchema],
        default: [] // Inicijalizujemo kao prazan niz
    },
    favorites: [String] // Referenca na šemu za omiljene stavke
});


const coachSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    price: Number,
    specialization: String,
    description: String,
    duration: Number,
    day: Number,
    premium: Boolean,
    image: String,
    ordersToTake: {
        type: [String], // Inicijalizujemo kao niz stringova
        default: [] // Inicijalizujemo kao prazan niz
    },
    favorites: [String]
});


// Kreiranje modela korisnika
const User = mongoose.model('User', userSchema);

const Coach = mongoose.model('Coach', coachSchema);

// Povezivanje sa MongoDB bazom podataka
mongoose.connect('mongodb+srv://amartubic1:eqlLdcWdVPiKOjcO@database.kyfuv8p.mongodb.net/moja_baza?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware za parsiranje JSON tela zahteva
app.use(bodyParser.json());


app.get('/.netlify/functions/server/coaches', async (req, res) => {
    try {
        const coaches = await Coach.find({ role: 'coach' });
        res.json(coaches);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja trenera iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja trenera iz baze' });
    }
});

//login
app.post('/.netlify/functions/server/api/login', async (req, res) => {
    console.log('Pristigao zahtev za prijavu:', req.body);

    try {
        const { email, password } = req.body;

        // Provera da li korisnik ili trener postoji u bazi podataka
        const existingUser = await User.findOne({ email, password }).lean();
        const existingCoach = await Coach.findOne({ email, password }).lean();

        if (existingUser) {
            console.log('Uspesna prijava:', existingUser);
            res.json({ success: true, message: 'Uspesna prijava.', user: { username: existingUser.username, role: existingUser.role } });
        } else if (existingCoach) {
            console.log('Uspesna prijava:', existingCoach);
            res.json({ success: true, message: 'Uspesna prijava.', user: { username: existingCoach.username, role: existingCoach.role } });
        } else {
            console.error('Neuspesna prijava: Korisnik ne postoji ili lozinka nije ispravna.');
            res.status(401).json({ success: false, message: 'Korisnik ne postoji ili lozinka nije ispravna.' });
        }

    } catch (error) {
        console.error('Došlo je do greške prilikom prijave:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom prijave.' });
    }
});

app.post('/.netlify/functions/server/api/register', async (req, res) => {
    console.log('Pristigao zahtev za signup:', req.body);
    try {
        const { email, username, password, repeatPassword, image, role, price, specialization, description, duration, day, premium } = req.body;

        // Provera da li su lozinke iste
        if (password !== repeatPassword) {
            return res.status(400).json({ success: false, message: 'Lozinke se ne podudaraju.' });
        }

        // Provera da li korisnik već postoji u bazi podataka
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        // Provera da li trener već postoji u bazi podataka
        const existingCoach = await Coach.findOne({ email });
        const existingCoachUsername = await Coach.findOne({ username });
        if (existingCoach) {
            return res.status(400).json({ success: false, message: 'Trener sa ovim korisničkim imenom već postoji.' });
        }
        if (existingCoachUsername) {
            return res.status(400).json({ success: false, message: 'Trener sa ovim emailom već postoji.' });
        }


        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim korisničkim imenom već postoji.' });
        }

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim emailom već postoji.' });
        }



        if (role === 'coach') {
            const newCoach = new Coach({ username, role, email, password, image });
            await newCoach.save();
        } else if (role === 'user') {
            const newUser = new User({ email, username, password, image, role });
            await newUser.save();
        } else {
            return res.status(400).json({ success: false, message: 'Nepoznata uloga.' });
        }

        res.json({ success: true, message: 'Uspešna registracija.' });

    } catch (error) {
        console.error('Došlo je do greške prilikom registracije baza:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom registracije.' });
    }
});






//setpremium user on buy
app.post('/.netlify/functions/server/api/premium', async (req, res) => {
    console.log('Pristigao zahtev za kupovinu premium:', req.body);
    const { username } = req.body;

    try {

        const coach = await Coach.findOne({ username: username });

        if (!coach) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim usernameom ne postoji.' });
        }

        // Postavite premium status na true
        coach.premium = true;
        await coach.save();

        res.json({ success: true, message: 'Uspešno ste kupili premium.' });

    } catch (error) {
        console.error('Doslo je do greske', error);
        res.status(500).json({ success: false, message: 'evo ne znam bogami' });
    }
});



//setup choachsettings
app.post('/.netlify/functions/server/api/choachsettings', async (req, res) => {
    const { username, price, specialization, duration, description, day } = req.body;

    try {
        // Pronađi trenera u bazi podataka prema korisničkom imenu
        const coach = await Coach.findOne({ username: username });

        if (!coach) {
            return res.status(404).json({ error: 'Trener nije pronađen.' });
        }
        coach.day = day;
        coach.duration = duration;
        coach.description = description;

        coach.specialization = specialization;

        // Postavi cijenu treneru
        coach.price = price;

        // Spremi promjene u bazu podataka
        await coach.save();

        res.status(200).json({ message: 'Cijena uspješno dodana treneru.' });
    } catch (error) {
        console.error('Greška prilikom dodavanja cijene treneru:', error);
        res.status(500).json({ error: 'Greška prilikom dodavanja cijene treneru.' });
    }
});


//find username for choach 
app.get('/.netlify/functions/server/api/username/:username', async (req, res) => {
    try {
        const { username } = req.params; // Dobavljanje korisničkog imena iz URL-a
        const coachUserName = await Coach.find({ username: username });

        if (!coachUserName) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        res.json(coachUserName);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja trenera iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja trenera iz baze' });
    }
});




// treba ovo fixat ne radi nesto?
//update user settings
app.post('/.netlify/functions/server/api/update', async (req, res) => {
    const { username, newUsername, password, role } = req.body;

    try {
        let user;

        // Pronađi korisnika ili trenera u bazi podataka prema trenutnom korisničkom imenu
        if (role === 'user') {
            user = await User.findOne({ username: username });
        } else if (role === 'coach') {
            user = await Coach.findOne({ username: username });
        } else {
            return res.status(400).json({ error: 'Nepoznata uloga.' });
        }

        if (!user) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        // Ažuriraj korisničko ime ako je novo korisničko ime dostavljeno
        if (newUsername) {
            user.username = newUsername;
        }

        // Ažuriraj lozinku ako je nova lozinka dostavljena
        if (password) {
            user.password = password;
        }

        // Spremi promjene u bazu podataka
        await user.save();

        res.status(200).json({ message: 'Postavke uspješno ažurirane.' });
    } catch (error) {
        console.error('Greška prilikom ažuriranja postavki korisnika:', error);
        res.status(500).json({ error: 'Greška prilikom ažuriranja postavki korisnika.' });
    }
});



app.post('/.netlify/functions/server/api/buycoach', async (req, res) => {
    const { username, coachName } = req.body;

    if (!coachName) {
        return res.status(400).json({ error: 'Narudžbina nije dostavljena ili je prazna.' });
    }

    try {
        // Pronađi korisnika u bazi podataka prema korisničkom imenu
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        const userEmail = user.email;

        const coach = await Coach.findOne({ username: coachName });
        if (!coach) {
            return res.status(404).json({ error: 'Trener nije pronađen.' });
        }

        coach.ordersToTake.push(username);
        await coach.save();

        // Proveri da li je polje orders definisano
        if (!user.orders) {
            user.orders = [];
        }

        // Proveri da li je coachName validan pre dodavanja narudžbine
        if (!coachName) {
            return res.status(400).json({ error: 'Ime trenera je prazno.' });
        }

        // Dodaj novu narudžbinu kao objekt u orders polje
        user.orders.push({ trainer: coachName, confirmed: false });

        // Spremi promjene u bazu podataka
        await user.save();

        res.status(200).json({ message: 'Narudžbina uspješno dodana.' });
    } catch (error) {
        console.error('Greška prilikom dodavanja narudžbine:', error.message);
        res.status(500).json({ error: `Greška prilikom dodavanja narudžbine: ${error.message}` });
    }
});



//update orders
app.post('/.netlify/functions/server/api/updateOrderStatus', async (req, res) => {
    const { username, trainer } = req.body;

    try {
        // Find the user and update the specific order status
        const user = await User.findOneAndUpdate(
            { username, 'orders.trainer': trainer, 'orders.confirmed': false }, // Match the user and the specific order
            { $set: { 'orders.$.confirmed': true } }, // Update the order's confirmed status to true
            { new: true } // Return the updated document
        );

        if (user) {
            res.status(200).json({ message: 'Order status updated successfully', user });
        } else {
            res.status(404).json({ message: 'Order not found or already confirmed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

app.get('/.netlify/functions/server/api/coach/:username', async (req, res) => {
    try {
        const { username } = req.params; // Dobavljanje korisničkog imena iz URL-a
        const userOrders = await Coach.find({ username: username });

        if (!userOrders) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        res.json(userOrders);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja narudžbina iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja narudžbina iz baze' });
    }
});

//fetch orders for user
app.get('/.netlify/functions/server/api/orders/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const trainers = user.orders.map(order => order.trainer);
        const status = user.orders.map(order => order.confirmed);
        res.status(200).json({
            trainers,
            status
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
});




const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};