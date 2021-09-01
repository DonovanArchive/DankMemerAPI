export interface APIErrorBody {
	success: boolean;
	error: string;
	serverError: {
		error: string;
		status: number;
	};
}

export default class APIError extends Error {
	statusCode: number;
	statusMessage: string;
	body?: APIErrorBody | string;
	constructor(statusCode: number, statusMessage: string, body: APIErrorBody | string) {
		super(`${statusCode} ${statusMessage}`);
		this.statusCode = statusCode;
		this.statusMessage = statusMessage;
		this.name = "APIError";
		this.body = body;
	}
}
