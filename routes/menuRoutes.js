/*
 * Routing för de olika menyerna
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

// Anslut till mongoDB
const db = require("../models/Database");

// Modeller för menyer
const Dinner = require("../models/Dinner");
const Lunch = require("../models/Lunch");
const TakeAway = require("../models/Takeaway"); //Ändra till TakeAway om det behövs. Systemet tror att jag har två filer efter namnbyte på filen?
const BookTable = require("../models/BookTable");

/*
*
* ROUTING FÖR MIDDAGSMENY
*
*/

// Hämta middagsmeny
router.get("/dinners", async (req, res) => {
    try {
        let result = await Dinner.find({});
        console.log(result); //Ta bort
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Skapa middag till middagsmeny
router.post("/dinners", async (req, res) => {
    try {
        console.log(req.body); // Ta bort
        const { name, category, description, price } = req.body;

        // Validera input
        if (!name || !category || !price) {
            return res
                .status(400)
                .json({
                    error: "It's required to send name, category, description and price",
                });
        }

        // Korrekt - spara middagsrätt
        const dinner = new Dinner({
            name,
            category,
            description: description || null,
            price,
            vegetarian: req.body.vegetarian || false, //false = defaultvärde
            vegan: req.body.vegan || false, // false = defaultvärde
        });
        await dinner.save();

        res.status(201).json({ message: "Dinner created" });
    } catch (error) {
        res.status(400).json({
            message: "Error creating course in dinner menu: " + error,
        });
    }
});

// Ändra middagsalternativ på menyn
router.put("/dinners/:_id", async (req, res) => {
    try {
        let dinnerId = req.params._id;
        let updateDinner = await Dinner.findOneAndUpdate({ _id: dinnerId }, req.body, { new: true });

        if(!updateDinner) {
            return res.status(404).json({ message: "Unable to find dinner" })
        }
        return res.json(updateDinner);
    } catch(error) {
        return res.status(500).json({ message: "Unable to update dinner: " + error});
    }
});

// Radera middagsalternativ från menyn
router.delete("/dinners/:_id", async (req, res) => {
    try {
        let dinnerId = req.params._id;
        let deleteDinner = await Dinner.findByIdAndDelete(dinnerId);

        if(!deleteDinner) {
            return res.status(400).json({ message: "Unable to find dinner" })
        }
        return res.json({ message: "Dinner deleted" });
    } catch(error) {
        return res.status(500).json({ message: "Unable to delete dinner: " + error})
    }
});



/*
*
* ROUTING FÖR LUNCHMENY
*
*/

// Hämta lunchmeny
router.get("/lunches", async (req, res) => {
    try {
        let result = await Lunch.find({});
        console.log(result); //Ta bort
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Lägg till lunch i lunchmeny
router.post("/lunches", async (req, res) => {
    try {
        console.log(req.body); // Ta bort
        const { week, weekday, description1, description2 } = req.body;

        // Validera input
        if (!week || !weekday || !description1 || !description2) {
            return res
                .status(400)
                .json({
                    error: "It's required to send week, weekday, and two descriptions",
                });
        }

        // Korrekt - spara lunchrätt
        const lunch = new Lunch({
            week, 
            weekday,
            description1,
            description2
        });
        await lunch.save();

        res.status(201).json({ message: `Lunch created for week: ${week}, weekday: ${weekday}` });
    } catch (error) {
        res.status(400).json({
            message: "Error creating lunch: " + error,
        });
    }
});

// Ändra lunch i lunchmeny
router.put("/lunches/:_id", async (req, res) => {
    try {
        let lunchId = req.params._id;
        let updateLunch = await Lunch.findOneAndUpdate({ _id: lunchId }, req.body, { new: true });

        if(!updateLunch) {
            return res.status(404).json({ message: "Unable to find lunch" })
        }
        return res.json(updateLunch);
    } catch(error) {
        return res.status(500).json({ message: "Unable to update lunch: " + error});
    }
});

// Radera lunch från lunchmeny
router.delete("/lunches/:_id", async (req, res) => {
    try {
        let lunchId = req.params._id;
        let deleteLunch = await Lunch.findByIdAndDelete(lunchId);

        if(!deleteLunch) {
            return res.status(400).json({ message: "Unable to find lunch" })
        }
        return res.json({ message: "Lunch deleted" });
    } catch(error) {
        return res.status(500).json({ message: "Unable to delete lunch: " + error})
    }
});

/*
*
* ROUTING FÖR TAKEAWAY-MENY
*
*/ 

// Hämta takeaway-meny
router.get("/takeaways", async (req, res) => {
    try {
        let result = await TakeAway.find({});
        console.log(result); //Ta bort
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Lägg till rätt i takeaway-meny
router.post("/takeaways", async (req, res) => {
    try {
        console.log(req.body); // Ta bort
        const { name, category, description, price } = req.body;

        // Validera input
        if (!name || !category || !price) {
            return res
                .status(400)
                .json({
                    error: "It's required to send name, category and price",
                });
        }

        // Korrekt - spara takeaway-rätt
        const takeaway = new TakeAway({
           name,
           category,
           description: description || null,
           price
        });
        await takeaway.save();

        res.status(201).json({ message: `New Take Away-dish added` });
    } catch (error) {
        res.status(400).json({
            message: "Error creating lunch: " + error,
        });
    }
});

// Ändra takeaway-rätt
router.put("/takeaways/:_id", async (req, res) => {
    try {
        let takeAwayId = req.params._id;
        let updateTakeAway = await TakeAway.findOneAndUpdate({ _id: takeAwayId }, req.body, { new: true });

        if(!updateTakeAway) {
            return res.status(404).json({ message: "Unable to find Take Away-course" })
        }
        return res.json(updateTakeAway);
    } catch(error) {
        return res.status(500).json({ message: "Unable to update Take Away: " + error});
    }
});

// Radera lunch från lunchmeny
router.delete("/takeaways/:_id", async (req, res) => {
    try {
        let takeAwayId = req.params._id;
        let deleteTakeAway = await TakeAway.findByIdAndDelete(takeAwayId);

        if(!deleteTakeAway) {
            return res.status(400).json({ message: "Unable to find Take Away" })
        }
        return res.json({ message: "Take Away deleted" });
    } catch(error) {
        return res.status(500).json({ message: "Unable to delete Take Away: " + error})
    }
});


/*
*
* ROUTING FÖR BORDSBOKNING
*
*/

// Hämta bordsbokning
router.get("/bookings", async (req, res) => {
    try {
        let result = await BookTable.find({});
        console.log(result); //Ta bort
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Skapa bordsbokning
router.post("/bookings", async (req, res) => {
    try {
        console.log(req.body); // Ta bort
        const { fullname, email, date, quantity } = req.body;

        // Validera input
        if (!fullname || !email || !date || !quantity) {
            return res
                .status(400)
                .json({
                    error: "It's required to send fullname, email, date, quantity",
                });
        }

        // Korrekt - spara bordsbokning
        const booking = new BookTable({
            fullname,
            email,
            date,
            quantity
        });
        await booking.save();

        res.status(201).json({ message: "Booking created" });
    } catch (error) {
        res.status(400).json({
            message: "Error creating booking: " + error,
        });
    }
});

// Radera bordsbokning
router.delete("/bookings/:_id", async (req, res) => {
    try {
        let bookingId = req.params._id;
        let deleteBooking = await BookTable.findByIdAndDelete(bookingId);

        if(!deleteBooking) {
            return res.status(400).json({ message: "Unable to find booking" })
        }
        return res.json({ message: "Booking deleted" });
    } catch(error) {
        return res.status(500).json({ message: "Unable to delete booking: " + error})
    }
});


module.exports = router;
