import phin from "phin";
import * as pkg from "./package.json";
import fileType from "file-type";
import { runInThisContext } from "vm";
import { throws } from "assert";

interface MemeRequestResponse {
	ext: string;
	mime: string;
	file: Buffer;
}

class APIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "APIError";
	}
}

export = class DankMemerAPI {
	apiKey: string;
	userAgent: string;
	cacheRequests: boolean;
	constructor(apiKey: string, userAgent?: string, cacheRequests?: boolean) {
		this.apiKey = apiKey;
		this.userAgent = userAgent || `DankMemerAPI/${pkg.version} (https://github.com/FurryBotCo/DankMemerAPI)`;
		this.cacheRequests = !!cacheRequests;
	}

	private async request(path: string, avatars: string[] | string = [], usernames: string[] | string = [], text = "", extra: { [k: string]: string; } = {}): Promise<MemeRequestResponse> {
		avatars = typeof avatars === "string" ? [avatars] : avatars;
		usernames = typeof usernames === "string" ? [usernames] : usernames;
		const data: {
			avatars?: string[];
			usernames?: string[];
			text?: string;
		} = {
			...extra
		};
		if (avatars && avatars.length > 0) data.avatars = avatars;
		if (usernames && usernames.length > 0) data.usernames = usernames;
		if (text && text.length > 0) data.text = text;

		const r = await phin({
			method: "POST",
			url: this.cacheRequests ? `https://api.furry.bot/V2/dankmemer/${path}` : `https://dankmemer.services/api/${path}`,
			headers: {
				"Authorization": this.apiKey,
				"User-Agent": this.userAgent,
				"Content-Type": "application/json"
			},
			timeout: 3e4,
			data
		});
		// it returns a buffer but says it returns a string for some reason??
		const b = r.body as unknown as Buffer;
		if (r.statusCode !== 200) {
			let j;
			try {
				j = JSON.parse(b.toString());
			} catch (e) {
				j = b.toString();
			}

			throw new APIError(`${r.statusCode} ${r.statusMessage}: ${j}`);
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
	async bed(avatars: [string, string]) { return this.request("bed", avatars, [], ""); }
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
	async corporate(avatar: string) { return this.request("corporate", [avatar], [], ""); }
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
	async expanddong(text: string) { return this.request("expanddog", [], [], text); }
	async facts(text: string) { return this.request("facts", [], [], text); }
	async failure(avatar: string) { return this.request("failure", [avatar], [], ""); }
	async fakenews(avatar: string) { return this.request("fakenews", [avatar], [], ""); }
	async fedora(avatar: string) { return this.request("fedora", [avatar], [], ""); }
	async floor(avatar: string, text: string) { return this.request("floor", [avatar], [], text); }
	async fuck(text: string) { return this.request("fuck", [], [], text); }
	async garfield(avatar: string, text: string) { return this.request("garfield", [avatar], [], text); }
	async gay(avatar: string) { return this.request("gay", [avatar], [], ""); }
	async goggles(avatar: string) { return this.request("goggles", [avatar], [], ""); }
	async hitler(avatar: string) { return this.request("hitler", [avatar], [], ""); }
	async humansgood(text: string) { return this.request("humansgood", [], [], text); }
	async inator(text: string) { return this.request("inator", [], [], text); }
	async invert(avatar: string) { return this.request("invert", [avatar], [], ""); }
	async ipad(avatar: string) { return this.request("ipad", [avatar], [], ""); }
	async jail(avatar: string) { return this.request("jail", [avatar], [], ""); }
	async justpretending(text: string) { return this.request("justpretending", [], [], text); }
	async kimborder(avatar: string) { return this.request("kimborder", [avatar], [], ""); }
	async knowyourlocation(text: string) { return this.request("knowyourlocation", [], [], text); }
	async kowalski(text: string) { return this.request("kowalski", [], [], text); }
	async laid(avatar: string) { return this.request("laid", [avatar], [], ""); }
	async letmein(text: string) { return this.request("letmein", [], [], text); }
	async lick(text: string) { return this.request("lick", [], [], text); }
	async madethis(avatars: [string, string]) { return this.request("madethis", avatars, [], ""); }
	async magik(avatar: string) { return this.request("magik", [avatar], [], ""); }
	async master(text: string) { return this.request("master", [], [], text); }
	async meme(avatar: string, extra?: { top_text?: string; bottom_text?: string; color?: string; font?: string; }) { return this.request("meme", [avatar], [], "", extra); }
	async note(text: string) { return this.request("note", [], [], text); }
	async nothing(text: string) { return this.request("nothing", [], [], text); }
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
	async screams(avatars: [string, string]) { return this.request("screams", avatars, [], ""); }
	async shit(text: string) { return this.request("shit", [], [], text); }
	async sickban(avatar: string) { return this.request("sickban", [avatar], [], ""); }
	async slap(avatars: [string, string]) { return this.request("slap", avatars, [], ""); }
	async slapsroof(text: string) { return this.request("slapsroof", [], [], text); }
	async sneakyfox(text: string) { return this.request("sneakyfox", [], [], text); }
	async spank(avatars: [string, string]) { return this.request("spank", avatars, [], ""); }
	async stroke(text: string) { return this.request("stroke", [], [], text); }
	async surprised(text: string) { return this.request("surprised", [], [], text); }
	async sword(username: string, text: string) { return this.request("sword", [], [username], text); }
	async thesearch(text: string) { return this.request("thesearch", [], [], text); }
	async trash(avatar: string) { return this.request("trash", [avatar], [], ""); }
	async trigger(avatar: string) { return this.request("trigger", [avatar], [], ""); }
	async tweet(avatar: string, usernames: [string] | [string, string], extra?: { altstyle?: string; }) { return this.request("tweet", [avatar], usernames, "", extra); }
	async ugly(avatar: string) { return this.request("ugly", [avatar], [], ""); }
	async unpopular(avatar: string, text: string) { return this.request("unpopular", [avatar], [], text); }
	async violence(text: string) { return this.request("violence", [], [], text); }
	async violentsparks(text: string) { return this.request("violentsparks", [], [], text); }
	async vr(text: string) { return this.request("vr", [], [], text); }
	async walking(text: string) { return this.request("walking", [], [], text); }
	async wanted(avatar: string) { return this.request("wanted", [avatar], [], ""); }
	async whothisis(avatar: string, text: string) { return this.request("whothisis", [avatar], [], text); }
	async yomomma() { return this.request("yomomma", [], [], "").then(r => r.file.toString()); }
	async youtube(avatar: string, username: string, text: string) { return this.request("youtube", [avatar], [username], text); }
};
