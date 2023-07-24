import Page from "bao/ui/page";
import MainLayout from "bao_site/ui/mainLayout";
import changelog from "bao_site/content/roadmap.mjs";
import { Map } from "bao/ui/proto";

export function GET(ctx) {
	return (
		<MainLayout
			title="changelog"
			scripts={["/favicon.js"]}
			className="app mobileOnly"
		>
			<Map arr={changelog} itemClasses="mb" com />
		</MainLayout>
	);
}
