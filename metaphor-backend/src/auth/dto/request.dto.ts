import { Request } from 'express';

export class GuarededHeaders extends Headers {
	authorization?: string;
}

export class GauredRequest extends Request {
	headers: GuarededHeaders;
}
