export = class APIError<B = {
	success: boolean;
	error: string;
	serverError: {
		error: string;
		status: number;
	};
}> extends Error {
	statusCode: number;
	statusMessage: string;
	body: B;
	constructor(statusCode: number, statusMessage: string, body: B) {
		super(`${statusCode} ${statusMessage}`);
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.name = "APIError";
		this.body = body;
	}
};
