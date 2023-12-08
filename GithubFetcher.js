// import github octokit library
const { Octokit } = require("@octokit/core");

class GithubFetcher {
    constructor(request) {
        this.request = request;
        // get token from env variable if not found, exit the code
        if (!process.env.GITHUB_TOKEN) {
            console.error('Error: GITHUB_TOKEN not found in environment variables.');
            process.exit(1);
        }
        this.token = process.env.GITHUB_TOKEN
        // init octokit
        this.octokit = new Octokit({ auth: this.token });
    }

    async fetch() {
        // get file content from github
        const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: this.request.owner,
            repo: this.request.repo,
            path: this.request.path
        })
        // decode base64 encoded content
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return content;
    }
}

// export GithubFetcher
module.exports = GithubFetcher;