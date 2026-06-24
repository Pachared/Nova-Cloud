package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

const githubAPIURL = "https://api.github.com"

type GitHubEmail struct {
	Email    string `json:"email"`
	Primary  bool   `json:"primary"`
	Verified bool   `json:"verified"`
}

type GitHubProfile struct {
	ID    int64  `json:"id"`
	Login string `json:"login"`
	Name  string `json:"name"`
}

type githubToken struct {
	AccessToken string `json:"access_token"`
}

func PrimaryGitHubEmail(emails []GitHubEmail) (string, bool) {
	for _, item := range emails {
		if item.Primary && item.Verified && item.Email != "" {
			return item.Email, true
		}
	}
	for _, item := range emails {
		if item.Verified && item.Email != "" {
			return item.Email, true
		}
	}
	return "", false
}

func FetchGitHubIdentity(code, redirectURI string) (GitHubProfile, string, error) {
	clientID := os.Getenv("GITHUB_CLIENT_ID")
	clientSecret := os.Getenv("GITHUB_CLIENT_SECRET")
	if clientID == "" || clientSecret == "" {
		return GitHubProfile{}, "", errors.New("GitHub OAuth is not configured")
	}

	values := url.Values{
		"client_id":     {clientID},
		"client_secret": {clientSecret},
		"code":          {code},
		"redirect_uri":  {redirectURI},
	}
	request, err := http.NewRequest(http.MethodPost, "https://github.com/login/oauth/access_token", strings.NewReader(values.Encode()))
	if err != nil {
		return GitHubProfile{}, "", err
	}
	request.Header.Set("Accept", "application/json")
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{Timeout: 10 * time.Second}
	response, err := client.Do(request)
	if err != nil {
		return GitHubProfile{}, "", err
	}
	defer response.Body.Close()

	var token githubToken
	if response.StatusCode != http.StatusOK || json.NewDecoder(response.Body).Decode(&token) != nil || token.AccessToken == "" {
		return GitHubProfile{}, "", errors.New("GitHub token exchange failed")
	}

	profile, err := githubRequest[GitHubProfile](client, token.AccessToken, "/user")
	if err != nil {
		return GitHubProfile{}, "", err
	}
	emails, err := githubRequest[[]GitHubEmail](client, token.AccessToken, "/user/emails")
	if err != nil {
		return GitHubProfile{}, "", err
	}
	email, ok := PrimaryGitHubEmail(emails)
	if !ok {
		return GitHubProfile{}, "", errors.New("a verified GitHub email is required")
	}
	return profile, email, nil
}

func githubRequest[T any](client *http.Client, token, path string) (T, error) {
	var value T
	request, err := http.NewRequest(http.MethodGet, githubAPIURL+path, bytes.NewReader(nil))
	if err != nil {
		return value, err
	}
	request.Header.Set("Accept", "application/vnd.github+json")
	request.Header.Set("Authorization", "Bearer "+token)
	request.Header.Set("X-GitHub-Api-Version", "2022-11-28")

	response, err := client.Do(request)
	if err != nil {
		return value, err
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return value, fmt.Errorf("GitHub API returned %s", response.Status)
	}
	if err := json.NewDecoder(response.Body).Decode(&value); err != nil {
		return value, err
	}
	return value, nil
}
