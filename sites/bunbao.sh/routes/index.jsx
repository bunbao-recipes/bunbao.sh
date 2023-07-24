import { readFileSync } from "node:fs";
import { join } from "node:path";
import { log } from "bao/lib/cologger";
import bcfg from "bao_site/config.bao";
import { updates } from "bao_site/content";
import MainLayout from "../ui/mainLayout";

const cfg = JSON.parse(readFileSync(join(process.cwd(), "package.json")));

function modifyClass(baseClass = "", ...modifiers) {
	if (!baseClass || baseClass === "") {
		return modifiers.join(" ");
	}
	return (
		`${baseClass} ` +
		modifiers
			.map((ent) => {
				return `${baseClass}_${ent}`;
			})
			.join(" ")
	);
}

function ucFirst(str = "") {
	return str[0]?.toUpperCase() + str.slice(1);
}

function Com({
	obj = {},
	name = "com",
	components = {},
	only = [],
	exclude = [],
}) {
	return (
		<div className={`${name}`}>
			{Object.entries(obj).map(([propName, val], _idx) => {
				if (only?.length !== 0 && !only.includes(propName)) {
					return "";
				}
				if (exclude?.length !== 0 && exclude.includes(propName)) {
					return "";
				}

				return (
					<div className={`${name}${ucFirst(propName)}`} key={_idx}>
						{components[propName]
							? components[propName]({ val, propName, obj })
							: val}
					</div>
				);
			})}
		</div>
	);
}

function Map({
	arr = [],
	name = "map",
	classes = "",
	itemClasses = "",
	only = [],
	exclude = [],
	components = {},
}) {
	return (
		<div className={`${name} ${classes}`.trim()}>
			{arr.map((ent, idx) => (
				<div key={idx} className={`${name}_${idx} ${itemClasses}`.trim()}>
					<Com
						obj={ent}
						name={`${name}Item`}
						only={only}
						exclude={exclude}
						components={components}
					/>
				</div>
			))}
		</div>
	);
}

function ListHref({ val, name, obj }) {
	const linkName = `${name}Link`;
	const link = obj[linkName] || obj["link"];
	return <a href={link}>{val}</a>;
}

function Section({ children, title }) {
	return (
		<section className="container px">
			{title && <h2 className="mb">{title}</h2>}
			{children}
		</section>
	);
}

function Tile({ idx }) {
	return (
		<div className="dancefloorTile">
			<div className={`square color_${idx}`}>&nbsp;</div>
		</div>
	);
}

export function GET(ctx) {
	return (
		<MainLayout title={bcfg.title}>
			<Section>
				<div className="center font_l uc mb">{bcfg.mantra}</div>
				<div className="center">
					<div>v {cfg.version}</div>
					<small className="dim">
						<a href="/changelog">changelog</a>
					</small>
				</div>
			</Section>
			<Section>
				<div className="dancefloor">
					{new Array(10).fill("").map((ent, idx) => (
						<Tile idx={idx} key={idx} />
					))}
				</div>
				<div className="dancefloor">
					{new Array(10).fill("").map((ent, idx) => (
						<Tile idx={9 - idx} key={idx} />
					))}
				</div>
			</Section>
			<Section title={"Updates"}>
				<Map
					arr={updates}
					only={["title", "date"]}
					itemClasses="mb"
					components={{
						title: ListHref,
					}}
				/>
			</Section>
			<Section>
				<h2 className="mb">Features</h2>
				<Map
					arr={bcfg.highlights}
					name="highlights"
					itemClasses="mb"
					components={{
						title: ({ val }) => <a href="#">{val}</a>,
						description: ({ val }) => <small>{val}</small>,
					}}
				/>
			</Section>
		</MainLayout>
		// <html lang="en">
		// 	<head>
		// 		<meta charSet="utf-8" />
		// 		<meta name="viewport" content="width=device-width, initial-scale=1" />
		// 		<title>{bcfg.title}</title>
		// 		<link href="/index.css" rel="stylesheet" />
		// 		<link href="/components/app.css" rel="stylesheet" />
		// 		<link href="/components/container.css" rel="stylesheet" />
		// 		<link href="/components/utils.css" rel="stylesheet" />
		// 		<script src="/favicon.js"></script>
		// 	</head>
		// 	<body className="app dark mobileOnly">
		// 		<header>
		// 			<div className="container px">
		// 				<h1 className="center font_xxl uc">{bcfg.title}</h1>
		// 				<div className="center">
		// 					<a href="/docs">docs</a>&nbsp;
		// 					<a href="/roadmap">roadmap</a>
		// 				</div>
		// 			</div>
		// 		</header>
		// 		<main>
		// 			<Section>
		// 				<div className="center font_l uc mb">{bcfg.mantra}</div>
		// 				<div className="center">
		// 					<div>v {cfg.version}</div>
		// 					<small className="dim">
		// 						<a href="/changelog">changelog</a>
		// 					</small>
		// 				</div>
		// 			</Section>
		// 			<Section title={"Updates"}>
		// 				<Map
		// 					arr={updates}
		// 					itemClasses="mb"
		// 					components={{
		// 						title: ListHref,
		// 					}}
		// 				/>
		// 			</Section>
		// 			<Section>
		// 				<h2 className="mb">Features</h2>
		// 				<Map
		// 					arr={bcfg.highlights}
		// 					name="highlights"
		// 					itemClasses="mb"
		// 					components={{
		// 						title: ({ val }) => <a href="#">{val}</a>,
		// 						description: ({ val }) => <small>{val}</small>,
		// 					}}
		// 				/>
		// 			</Section>
		// 		</main>
		// 		<footer className="font-s">
		// 			<Section>
		// 				<Map
		// 					arr={bcfg.socials}
		// 					only={["title"]}
		// 					components={{
		// 						title: ({ val, obj }) => <a href={obj.link}>{val}</a>,
		// 					}}
		// 				/>
		// 			</Section>
		// 		</footer>
		// 	</body>
		// </html>
	);
}

//log(GET());
