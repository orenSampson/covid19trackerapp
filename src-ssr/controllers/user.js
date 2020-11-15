const axios = require("axios");

const User = require("../models/user");
const { COVID_BASE_URL } = require("../constants/covid19");
const { serverError, successfulResponse } = require("../constants/responses");

exports.getCountries = async (req, res, next) => {
	const userId = req.cookies.userId;

	if (!userId) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	let countriesSummary;

	try {
		countriesSummary = await axios.get(COVID_BASE_URL + "/summary");
		countriesSummary = countriesSummary.data.Countries;
	} catch (err) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	let userCountries;
	try {
		userCountries = await User.findOne({ _id: userId }, "-_id countries").populate(
			"countries._id",
			"slug isSelected"
		);
	} catch (err) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	if (!userCountries) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	userCountries = userCountries.countries;

	userCountries = userCountries.filter((item) => item._id.isSelected);

	const userSlugs = userCountries.map((item) => item._id.slug);

	countriesSummary = countriesSummary.filter((item) => {
		const slug = item.Slug;
		return userSlugs.includes(slug);
	});

	countriesSummary = countriesSummary.map((item) => {
		const slug = item.Slug;
		const i = userSlugs.indexOf(slug);
		return {
			Country: item.Country,
			TotalConfirmed: item.TotalConfirmed,
			NewConfirmed: item.NewConfirmed,
			TotalDeaths: item.TotalDeaths,
			TotalRecovered: item.TotalRecovered,
			countryId: userCountries[i]._id._id.toString(),
			isSelected: userCountries[i].isSelected
		};
	});

	res.status(successfulResponse.status).json({ data: countriesSummary });
};

exports.updateSelected = async (req, res, next) => {
	const userId = req.cookies.userId;
	const countryId = req.body.countryId;
	const isSelectedNewVal = req.body.isSelectedNewVal;

	let user;

	try {
		user = await User.findOne({ _id: userId }, "countries");
	} catch (err) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	if (!user) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	const userCountries = user.countries;

	const i = userCountries.findIndex((item) => item._id.toString() === countryId);

	if (i < 0) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	userCountries[i].isSelected = isSelectedNewVal;

	try {
		await user.save();
	} catch (err) {
		return res.status(serverError.status).json({ message: serverError.message });
	}

	res.status(successfulResponse.status).end();
};
