import { log } from "bao/lib/cologger.mjs";
/**
 * Page sceleton
 * @returns
 */
export default function Page({
	title = "",
	children = "",
	className = "",
	scripts = [],
	styles = [],
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{title}</title>

				{styles.map((ent, idx) => {
					return <link href={ent} rel="stylesheet" key={idx} />;
				})}

				{scripts.map((ent, idx) => {
					return <script src={ent} key={idx}></script>;
				})}

				{/* <link href="/index.css" rel="stylesheet" />
				<link href="/components/app.css" rel="stylesheet" />
				<link href="/components/container.css" rel="stylesheet" />
				<link href="/components/utils.css" rel="stylesheet" />
				<script src="/favicon.js"></script> */}
			</head>
			{/* <body className="app dark mobileOnly"> */}
			<body className={className}>{children}</body>
		</html>
	);
}
