const c = {
	summary: {
		brandName: "Bunbao",
		title: "Bunbao - framework for web2 -> web3 conversion",
		description: "Bunbao description",
		mantra: "mantra",
		authors: [],
	},

	appearance: {
		darkColor: "#333",
		lightColor: "#eaeaea",
	},

	socials: ["https://github.com", "https://twitter.com"],

	site: {
		nav: [
			{ title: "Docs", href: "https://doc.me.com" },
			{ title: "Account", href: "https://auth.me.com" },
		],
		sections: {},
	},

	/**
	 * Becouse project can have few presentations
	 */
	presentations: {
		deck: {
			slides: {},
		},
	},
};

c.site.sections["hero1"] = {
	component: "Hero",
	opts: {
		title: c.summary.title,
		mantra: c.summary.mantra,
	},
};

c.site.sections["hero2"] = {
	component: "Hero",
	opts: {
		title: "this is hero 2",
		mantra: "this is mantra 2",
	},
};

c.site.sections.emphasis = {
	component: "Emphasis",
	opts: {
		title: "this is emphasis",
	},
};

export default c;
