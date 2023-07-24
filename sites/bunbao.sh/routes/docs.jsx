import MainLayout from "bao_site/ui/mainLayout";

export function GET(ctx) {
	return (
		<MainLayout
			title="changelog"
			scripts={["/favicon.js"]}
			className="app mobileOnly"
		>
			docs
		</MainLayout>
	);
}
