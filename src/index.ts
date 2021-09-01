import APIError, { APIErrorBody } from "./APIError";
import * as pkg from "../package.json";
import fileType from "file-type";
import fetch from "node-fetch";

export interface MemeRequestResponse {
	ext: string;
	mime: string;
	file: Buffer;
}

class DankMemerAPI {
	apiKey: string;
	userAgent: string;
	cacheRequests: boolean;
	timeout: number;
	constructor(d: {
		apiKey: string;
		userAgent?: string;
		cacheRequests?: boolean;
		timeout?: number;
	}) {
		if (!d || !d.apiKey) throw new TypeError("missing api key");
		this.apiKey = d.apiKey;
		this.userAgent = d.userAgent || `DankMemerAPI/${pkg.version} (https://github.com/FurryBotCo/DankMemerAPI)`;
		this.cacheRequests = !!d.cacheRequests;
		this.timeout = !d.timeout ? 3e4 : d.timeout;
	}

	async request(path: "yomomma", avatars?: Array<string> | string, usernames?: Array<string> | string, text?: string, extra?: Record<string, string>): Promise<string>;
	async request(path: string, avatars?: Array<string> | string, usernames?: Array<string> | string, text?: string, extra?: Record<string, string>): Promise<MemeRequestResponse>;
	async request(path: string, avatars: Array<string> | string = [], usernames: Array<string> | string = [], text = "", extra: Record<string, string> = {}): Promise<MemeRequestResponse | string> {
		if (!Array.isArray(avatars)) avatars = [avatars];
		if (!Array.isArray(usernames)) usernames = [usernames];
		const data: {
			avatars?: Array<string>;
			usernames?: Array<string>;
			text?: string;
		} = {
			...extra
		};
		if (avatars && avatars.length > 0) data.avatars = avatars;
		if (usernames && usernames.length > 0) data.usernames = usernames;
		if (text && text.length > 0) data.text = text;

		const r = await fetch(`https://dankmemer.services/api/${path}`, {
			method: path === "yomomma" ? "GET" : "POST",
			headers: {
				"Authorization": this.apiKey,
				"User-Agent": this.userAgent,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		// it returns a buffer but says it returns a string for some reason??
		const b = await r.buffer();
		if (r.status !== 200) {
			let j: APIErrorBody | string;
			try {
				j = JSON.parse(b.toString()) as typeof j;
			} catch (e) {
				j = b.toString();
			}

			throw new APIError(r.status, r.statusText, j);
		}
		const type = await fileType.fromBuffer(b).catch(() => ({
			ext: null,
			mime: null
		})) as fileType.FileTypeResult;
		return {
			ext: type.ext,
			mime: type.mime,
			file: b
		};
	}

	// I could have made this getters, but I believe separate
	// functions will be easier

	async abandon(text: string) { return this.request("abandon", [], [], text); }
	async aborted(avatar: string) { return this.request("aborted", [avatar], [], ""); }
	async affect(avatar: string) { return this.request("affect", [avatar], [], ""); }
	async airpods(avatar: string) { return this.request("airpods", [avatar], [], ""); }
	async america(avatar: string) { return this.request("america", [avatar], [], ""); }
	async armor(text: string) { return this.request("armor", [], [], text); }
	async balloon(text: string) { return this.request("balloon", [], [], text); }
	async bed(avatars: [avatar1: string, avatar2: string]) { return this.request("bed", avatars, [], ""); }
	async bongocat(avatar: string) { return this.request("bongocat", [avatar], [], ""); }
	async boo(text: string) { return this.request("boo", [], [], text); }
	async brain(text: string) { return this.request("brain", [], [], text); }
	async brazzers(avatar: string) { return this.request("brazzers", [avatar], [], ""); }
	async byemom(avatar: string, username: string, text: string) { return this.request("byemom", [avatar], [username], text); }
	async cancer(avatar: string) { return this.request("cancer", [avatar], [], ""); }
	async changemymind(text: string) { return this.request("changemymind", [], [], text); }
	async cheating(text: string) { return this.request("cheating", [], [], text); }
	async citation(text: string) { return this.request("citation", [], [], text); }
	async communism(avatar: string) { return this.request("communism", [avatar], [], ""); }
	async confusedcat(text: string) { return this.request("confusedcat", [], [], text); }
	async corporate(avatars: string | [avatar1: string, avatar2?: string]) { return this.request("corporate", Array.isArray(avatars) ? avatars as Array<string> : [avatars], [], ""); }
	async crab(text: string) { return this.request("crab", [], [], text); }
	async cry(text: string) { return this.request("cry", [], [], text); }
	async dab(avatar: string) { return this.request("dab", [avatar], [], ""); }
	async dank(avatar: string) { return this.request("dank", [avatar], [], ""); }
	async deepfry(avatar: string) { return this.request("deepfry", [avatar], [], ""); }
	async delete(avatar: string) { return this.request("delete", [avatar], [], ""); }
	async disability(avatar: string) { return this.request("disability", [avatar], [], ""); }
	async doglemon(text: string) { return this.request("doglemon", [], [], text); }
	async door(avatar: string) { return this.request("door", [avatar], [], ""); }
	async egg(avatar: string) { return this.request("egg", [avatar], [], ""); }
	async excuseme(text: string) { return this.request("excuseme", [], [], text); }
	async expanddong(text: string) { return this.request("expanddong", [], [], text); }
	async expandingwwe(text: string) { return this.request("expandingwwe", [], [], text); }
	async facts(text: string) { return this.request("facts", [], [], text); }
	async failure(avatar: string) { return this.request("failure", [avatar], [], ""); }
	async fakenews(avatar: string) { return this.request("fakenews", [avatar], [], ""); }
	async farmer(text: string) { return this.request("farmer", [], [], text); }
	async fedora(avatar: string) { return this.request("fedora", [avatar], [], ""); }
	async floor(avatar: string, text: string) { return this.request("floor", [avatar], [], text); }
	async fuck(text: string) { return this.request("fuck", [], [], text); }
	async garfield(avatar: string, text: string) { return this.request("garfield", [avatar], [], text); }
	async gay(avatar: string) { return this.request("gay", [avatar], [], ""); }
	async godwhy(text: string) { return this.request("godwhy", [], [], text); }
	async goggles(avatar: string) { return this.request("goggles", [avatar], [], ""); }
	async hitler(avatar: string) { return this.request("hitler", [avatar], [], ""); }
	async humansgood(text: string) { return this.request("humansgood", [], [], text); }
	async inator(text: string) { return this.request("inator", [], [], text); }
	async invert(avatar: string) { return this.request("invert", [avatar], [], ""); }
	async ipad(avatar: string) { return this.request("ipad", [avatar], [], ""); }
	async jail(avatar: string) { return this.request("jail", [avatar], [], ""); }
	async justpretending(text: string) { return this.request("justpretending", [], [], text); }
	async keepurdistance(text: string) { return this.request("keepurdistance", [], [], text); }
	async kimborder(avatar: string) { return this.request("kimborder", [avatar], [], ""); }
	async knowyourlocation(text: string) { return this.request("knowyourlocation", [], [], text); }
	async kowalski(text: string) { return this.request("kowalski", [], [], text); }
	async laid(avatar: string) { return this.request("laid", [avatar], [], ""); }
	async letmein(text: string) { return this.request("letmein", [], [], text); }
	async lick(text: string) { return this.request("lick", [], [], text); }
	async madethis(avatars: [avatar1: string, avatar2: string]) { return this.request("madethis", avatars, [], ""); }
	async magik(avatar: string) { return this.request("magik", [avatar], [], ""); }
	async master(text: string) { return this.request("master", [], [], text); }
	async meme(avatar: string, extra?: { top_text?: string; bottom_text?: string; color?: string; font?: "arial" | "arimobold" | "impact" | "robotomedium" | "robotoregular" | "sans" | "segoeuireg" | "tahoma" | "verdana"; }) { return this.request("meme", [avatar], [], "", extra); }
	async note(text: string) { return this.request("note", [], [], text); }
	async nothing(text: string) { return this.request("nothing", [], [], text); }
	async obama(text: string) { return this.request("obama", [], [], text); }
	async ohno(text: string) { return this.request("ohno", [], [], text); }
	async piccolo(text: string) { return this.request("piccolo", [], [], text); }
	async plan(text: string) { return this.request("plan", [], [], text); }
	async presentation(text: string) { return this.request("presentation", [], [], text); }
	async quote(avatar: string, username: string, text: string) { return this.request("quote", [avatar], [username], text); }
	async radialblur(avatar: string) { return this.request("radialblur", [avatar], [], ""); }
	async rip(avatar: string) { return this.request("rip", [avatar], [], ""); }
	async roblox(avatar: string) { return this.request("roblox", [avatar], [], ""); }
	async salty(avatar: string) { return this.request("salty", [avatar], [], ""); }
	async satan(avatar: string) { return this.request("satan", [avatar], [], ""); }
	async savehumanity(text: string) { return this.request("savehumanity", [], [], text); }
	async screams(avatars: [avatar1: string, avatar2: string]) { return this.request("screams", avatars, [], ""); }
	async shit(text: string) { return this.request("shit", [], [], text); }
	async sickban(avatar: string) { return this.request("sickban", [avatar], [], ""); }
	async slap(avatars: [avatar1: string, avatar2: string]) { return this.request("slap", avatars, [], ""); }
	async slapsroof(text: string) { return this.request("slapsroof", [], [], text); }
	async sneakyfox(text: string) { return this.request("sneakyfox", [], [], text); }
	async spank(avatars: [avatar1: string, avatar2: string]) { return this.request("spank", avatars, [], ""); }
	async stroke(text: string) { return this.request("stroke", [], [], text); }
	async surprised(text: string) { return this.request("surprised", [], [], text); }
	async sword(username: string, text: string) { return this.request("sword", [], [username], text); }
	// theoffice
	async thesearch(text: string) { return this.request("thesearch", [], [], text); }
	async trash(avatar: string) { return this.request("trash", [avatar], [], ""); }
	async trigger(avatar: string) { return this.request("trigger", [avatar], [], ""); }
	async tweet(avatar: string, usernames: [user1: string, user2?: string], text: string, extra?: { altstyle?: string; }) { return this.request("tweet", [avatar], usernames as Array<string>, text, extra); }
	async ugly(avatar: string) { return this.request("ugly", [avatar], [], ""); }
	async unpopular(avatar: string, text: string) { return this.request("unpopular", [avatar], [], text); }
	async violence(text: string) { return this.request("violence", [], [], text); }
	async violentsparks(text: string) { return this.request("violentsparks", [], [], text); }
	async vr(text: string) { return this.request("vr", [], [], text); }
	async walking(text: string) { return this.request("walking", [], [], text); }
	async wanted(avatar: string) { return this.request("wanted", [avatar], [], ""); }
	async warp(avatar: string) { return this.request("warp", [avatar], [], ""); }
	async whodidthis(avatar: string) { return this.request("whodidthis", [avatar], []); }
	async whothisis(avatar: string, text: string) { return this.request("whothisis", [avatar], [], text); }
	async yomomma() { return this.request("yomomma", [], [], ""); }
	async youtube(avatar: string, username: string, text: string) { return this.request("youtube", [avatar], [username], text); }
}

export default DankMemerAPI;
export { DankMemerAPI, APIError };
