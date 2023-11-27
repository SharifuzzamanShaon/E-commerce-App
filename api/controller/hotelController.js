const Hotel = require("../model/Hotel")

const addHotel = async (req, res) => {
    try {
        const newHotel = new Hotel(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).send(savedHotel)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getHotel = async (req, res) => {
    try {
        const allHotel = await Hotel.find()
        res.status(200).send(allHotel)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const putHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const  updateValue  = req.body
        // console.log(req.body);
        // console.log(updateValue);

        const isExists = await Hotel.findById(id)
        if (!isExists) {
            return res.status(404).send("Not found")
        }
        const updateHotel = await Hotel.findByIdAndUpdate(id, { ...updateValue }, { new: true })
        return res.status(200).send(updateHotel)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const patchHotel = async (req, res) => {

    const { id } = req.params;
}

module.exports = {
    addHotel,
    getHotel,
    putHotel,
    patchHotel
}