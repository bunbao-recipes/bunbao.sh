import Page from "bao/ui/page";
import { Section, Map } from "bao/ui/proto";
import bcfg from "bao_site/config.bao";

export default function MainLayout({ children, title = "layout" }) {
	return (
		<Page
			title={title}
			className="app dark mobileOnly bg"
			scripts={["/favicon.js"]}
			styles={["/index.css", "/components/app.css", "/components/utils.css"]}
		>
			<header>
				<div className="container px">
					<h1 className="center font_xxl uc">
						<img id="logo1" style={{ width: "2rem" }} />
						&nbsp;
						<a href="/" className="clear">
							{bcfg.title}
						</a>
						&nbsp;
						<img id="logo2" style={{ width: "2rem" }} />
					</h1>
					<div className="center">
						<a href="/docs">docs</a>&nbsp;&nbsp;
						<a href="/roadmap">roadmap</a>&nbsp;&nbsp;
						<a href="/invest">investors</a>
					</div>
				</div>
			</header>
			<main>{children}</main>
			<footer className="font-s">
				<Section>
					<Map
						arr={bcfg.socials}
						only={["title"]}
						components={{
							title: ({ val, obj }) => <a href={obj.link}>{val}</a>,
						}}
					/>
				</Section>
			</footer>
		</Page>
	);
}
