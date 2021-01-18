export default class APIError extends Error {
	statusCode: number;
	statusMessage: string;
	body?: {
		success: boolean;
		error: string;
		serverError: {
			error: string;
			status: number;
		};
	};
	constructor(statusCode: number, statusMessage: string, body: APIError["body"]) {
		super(`${statusCode} ${statusMessage}`);
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.name = "APIError";
		this.body = body;
	}
};
