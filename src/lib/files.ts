import config from "@/config";
import siteConfig from "@/config/site";

const committer = {
    name: siteConfig.title,
    email: config.github.email,
}

type GithubUploadOptions = {
    path: string;
    content: string;
}

export async function uploadToGithub(options: GithubUploadOptions) {
    const response = await fetch(`https://api.github.com/repos/${config.github.repo}/contents/${options.path}`, {
        method: 'PUT',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${config.github.token}`,
        },
        body: JSON.stringify({
            message: `💬 Upload ${options.path}`,
            content: Buffer.from(options.content).toString('base64'),
            committer,
        }),
    });

    return response.ok;
}

type GithubGetOptions = {
    path: string;
}

export async function getFromGithub(options: GithubGetOptions) {
    const response = await fetch(`https://api.github.com/repos/${config.github.repo}/contents/${options.path}`, {
        method: 'GET',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${config.github.token}`,
        },
    });

    if (!response.ok) throw new Error(`Github api - ${response.statusText}`);

    return await response.json();
} 

type GithubDeleteOptions = {
    path: string;
}

export async function deleteFromGithub(options: GithubDeleteOptions) {
    const file = await getFromGithub(options);

    const response = await fetch(`https://api.github.com/repos/${config.github.repo}/contents/${options.path}`, {
        method: 'DELETE',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${config.github.token}`,
        },
        body: JSON.stringify({
            message: `🔥 Delete ${options.path}`,
            sha: file.sha,
            committer,
        }),
    });

    return response.ok;
}