import site from "@/config/site";

const _log = (level: keyof Console, ...messages: unknown[]) => {
	const method: typeof console.log = console[level] || console.log;
	if (!method) return;

	const { matches: dark } = window.matchMedia("(prefers-color-scheme: dark)");
	const baseStyles =
		"font-weight: bold; border-radius: 10px; padding: 4px 8px;";
	const titleStyle = "font-size: 15px;";
	const timestampStyles = "opacity: 0.7; font-style: italic;";

	const headerStyle = dark
		? "background: #fff; color: #000;"
		: "background: #000; color: #fff;";
	const timestamp = new Date().toLocaleString();

	method(
		`%c${site.title}%c${timestamp}`,
		[baseStyles, headerStyle, titleStyle].join(" "),
		[baseStyles, timestampStyles].join(" "),
		...messages,
	);
};

export const logger = {
	info: (...messages: unknown[]) => _log("info", ...messages),
	warn: (...messages: unknown[]) => _log("warn", ...messages),
	error: (...messages: unknown[]) => _log("error", ...messages),
	log: (...messages: unknown[]) => _log("log", ...messages),
};
