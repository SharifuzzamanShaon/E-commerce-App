const Listing = require("../model/listingModel")
const createListing = async (req, res, next) => {
    try {
        const newList = req.body
        const newItem = await Listing.create({ ...newList, userRef: req.user._id });
        return res.status(200).send({ message: "new listing created", newItem })
    } catch (error) {
        next(error)
    }

}

const getListing = async (req, res, next) => {
    try {
        const id = req.params.id
        const lists = await Listing.find({ userRef: id }).populate('userRef', 'username email -_id')
        if (!lists) throw error("Listing not found", 404)
        return res.status(200).send(lists)
    } catch (err) {
        next(err)
    }
}
const getSearchedListing = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        const limit = req.query.limit;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';
        console.log(offer, furnished);
        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).send(listings);
    } catch (error) {
        next(error)
    }
}
module.exports = { createListing, getListing, getSearchedListing }