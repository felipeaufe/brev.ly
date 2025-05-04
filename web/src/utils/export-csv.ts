/* eslint-disable @typescript-eslint/no-explicit-any */

export function exportCSV<T>(data: T[], filename = "blog.csv") {
	if (data.length === 0) return;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const headers = Object.keys((data as any)[0]);

	const csvRows = [
		headers.join(","),
		...data.map((post) =>
			headers
				.map((h) => {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					return `"${(post as any)[h]}"`;
				})
				.join(","),
		),
	];

	const csvString = csvRows.join("\n");
	const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
