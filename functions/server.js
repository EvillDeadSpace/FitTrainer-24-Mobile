const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const app = express();
const PORT = process.env.PORT || 3000;
const ServerlessHttp = require('serverless-http');

const jwt = require('jsonwebtoken');

// Definisanje šeme za korisnika
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
    day:Number,
    
    favorites: [String] // Referenca na šemu za omiljene stavke
});

// Kreiranje modela korisnika
const User = mongoose.model('User', userSchema);

// Povezivanje sa MongoDB bazom podataka
mongoose.connect('mongodb+srv://amartubic1:eqlLdcWdVPiKOjcO@database.kyfuv8p.mongodb.net/moja_baza?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware za parsiranje JSON tela zahteva
app.use(bodyParser.json());


app.get('/.netlify/functions/server/coaches', async (req, res) => {
    try {
        const coaches = await User.find({ role: 'coach' });
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

        // Provera da li korisnik postoji u bazi podataka
        const existingUser = await User.findOne({ email, password }).lean();
        console.log(User);

        const secretKey = 'tajna'; // Promijenite s dinamičkim tajnim ključem kasnije
        const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' });

        if (existingUser) {
            console.log('Uspesna prijava:', existingUser);
            res.json({ success: true, message: 'Uspesna prijava.', user: { username: existingUser.username }, token: token, });
        } else {
            console.error('Neuspesna prijava: Korisnik ne postoji ili lozinka nije ispravna.');
            res.status(401).json({ success: false, message: 'Korisnik ne postoji ili lozinka nije ispravna.' });
        }

    } catch (error) {
        console.error('Došlo je do greške prilikom prijave:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom prijave.' });
    }
});


// Ruta za registraciju
app.post('/.netlify/functions/server/api/register', async (req, res) => {
    console.log('Pristigao zahtev za signup:', req.body);
    try {
        const { email, username, password, repeatPassword, image, role } = req.body;

        // Provera da li su lozinke iste
        if (password !== repeatPassword) {
            return res.status(400).json({ success: false, message: 'Lozinke se ne podudaraju.' });
        }

        // Provera da li korisnik već postoji u bazi podataka
        const existingUser = await User.findOne({ email });

        const exisingUsername = await User.findOne({ username });

        if (exisingUsername) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim usernamom već postoji.' });
        }

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim emailom već postoji.' });
        }

        // Kreiranje novog korisnika u bazi podataka
        const newUser = new User({ email, username, password, image, role });
        await newUser.save();

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

        const coach = await User.findOne({ username: username });

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
      const coach = await User.findOne({ username: username });

      if (!coach) {
        return res.status(404).json({ error: 'Trener nije pronađen.' });
      }
      coach.day = day;
      coach.duration= duration;
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
        const user = await User.find({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        res.json(user);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja trenera iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja trenera iz baze' });
    }
});


//update user settings
app.post('/.netlify/functions/server/api/update', async (req, res) => {
    const { username, newUsername, password } = req.body;
  
    try {
      // Pronađi korisnika u bazi podataka prema trenutnom korisničkom imenu
      const user = await User.findOne({ username: username });
  
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




const handler= ServerlessHttp(app);

module.exports.handler = async(event, context)=>{
    const result = await handler(event, context);
    return result;
};