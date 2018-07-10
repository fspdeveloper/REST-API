const Contact = require('../models/ContactModels');

// @Route (GET) /api/contacts/
// @Desc        Get All Contacts
// @Access       Public
const getContactController = async (req, res, next) => {

    try {
        const getAllData = await Contact.find()

        if (getAllData.length > 0) {
            res.status(200).send({
                "message": "Get All Data 😊 😍",
                getAllData
            })
        } else {
            res.status(204).send({
                message: "There is No Data 😒 😒"

            })
        }

    } catch (error) {
        console.log(err)
        res.status(204)
    }

}

// ------------------------------


// @Route (POST) /api/contact/
// @Desc        Create A New Contact
// @Access       Private
const postContactController = async (req, res, next) => {

    try {
        const createData = await Contact.create(req.body)

        res.status(201).send({
            message: "Contact Created Successfully 😯 😊",
            createData
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Contact Not Created 😣 😶"
        })
    }




}

// ------------------------------


/// @Route (GET) /api/contact/
// @Desc         Get a Single Contact with ID
// @Access       Private
const getSingelContactController = async (req, res, next) => {

    try {
        const singelData = await Contact.findById(req.params.id)

        res.status(302).send({
            message: "Singel Data",
            singelData
        })

    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "Invalid ID 😑 Data Not Found  🧐"
        })
    }
}

// ------------------------------


/// @Route (PATCH) /api/contact/
// @Desc         Update a Single Contact with ID
// @Access       Private
const patchContactController = async (req, res, next) => {

    try {

        const updateData = await Contact.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })

        if (!updateData) {
            res.status(304).send({
                message: "Data Not Updated  😕 😜",
            });
        }

        res.status(202).send({
            message: "Data Updated Successfully  🤩 🤗",
            updateData
        })
    } catch (error) {
        res.status(304).send(error)
    }

}


// ------------------------------

/// @Route (DELETE) /api/contact/
// @Desc         Delete a Single Contact with ID
// @Access       Private
const deleteContactController = async (req, res, next) => {


    try {
        const deletedData = await Contact.findByIdAndRemove(req.params.id);

        if (!deletedData) {
            res.send({
                message: "Data Already Deleted  😕 😜",
            });
        }

        res.send({
            message: "Data Deleted Successfully 😕 🤨",
            deletedData
        });

    } catch (error) {
        console.log(error);
        res.status(304).send(error)
    }

}

module.exports = {
    postContactController,
    getContactController,
    getSingelContactController,
    patchContactController,
    deleteContactController
}