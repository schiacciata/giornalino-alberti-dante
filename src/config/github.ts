const githubConfig = {
	repo: "schiacciata/giornalino-alberti-dante",
	botEmail: "github-actions[bot]@users.noreply.github.com",
	rawUrl: <R extends string>(repo: R, branch = "master") =>
		`https://raw.githubusercontent.com/${repo}/refs/heads/${branch}/` as const,
} as const;

export default githubConfig;
