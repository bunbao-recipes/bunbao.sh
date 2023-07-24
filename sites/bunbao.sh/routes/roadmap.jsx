import MainLayout from "bao_site/ui/mainLayout";
import roadmap from "bao_site/content/roadmap.mjs";
import { ListHref, Map, Section } from "bao/ui/proto";

export function GET(ctx) {
	return (
		<MainLayout
			title="changelog"
			scripts={["/favicon.js"]}
			className="app mobileOnly"
		>
			<Section>
				<Map
					arr={roadmap}
					itemClasses="mb"
					components={{
						title: ListHref,
					}}
				/>
			</Section>
		</MainLayout>
	);
}
