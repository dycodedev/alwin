function enumerateModelError(error) {
	// takes an error object returned by save method of a model object
	// returns an array of each path of a model which contains error

	var tmpArrayOfError = [];

	for (item in error.errors) {
	  tmpArrayOfError.push(error.errors[item]);
	}

	return tmpArrayOfError;
}

exports.enumerateModelError = enumerateModelError;