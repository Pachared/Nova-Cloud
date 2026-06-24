package services

import "testing"

func TestPrimaryGitHubEmailPrefersVerifiedPrimaryAddress(t *testing.T) {
	emails := []GitHubEmail{
		{Email: "fallback@example.com", Verified: true},
		{Email: "primary@example.com", Verified: true, Primary: true},
	}

	email, ok := PrimaryGitHubEmail(emails)
	if !ok || email != "primary@example.com" {
		t.Fatalf("expected verified primary email, got %q", email)
	}
}
