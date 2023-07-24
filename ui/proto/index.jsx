/**
 *
 * @param {*} str
 * @returns
 */
export function ucFirst(str = "") {
	return str[0]?.toUpperCase() + str.slice(1);
}

/**
 *
 * @param {*} param0
 * @returns
 */
export function Com({
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

/**
 *
 * @param {*} param0
 * @returns
 */
export function Map({
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

/**
 *
 * @param {*} param0
 * @returns
 */
export function ListHref({ val, name, obj }) {
	const linkName = `${name}Link`;
	const link = obj[linkName] || obj["link"];
	return <a href={link}>{val}</a>;
}

/**
 *
 * @param {*} param0
 * @returns
 */
export function Section({ children, title }) {
	return (
		<section className="container px">
			{title && <h2 className="mb">{title}</h2>}
			{children}
		</section>
	);
}
