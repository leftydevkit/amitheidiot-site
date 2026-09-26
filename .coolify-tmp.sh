#!/usr/bin/env sh
# Temporary: report one deployment's status. Deleted after use.
set -eu
. "$HOME/.config/coolify/secrets.env"
curl -sS --max-time 20 -H "Authorization: Bearer $COOLIFY_API_TOKEN" \
	"$COOLIFY_URL/api/v1/deployments/lgxh9sr20hfc62bazba1c9sl" \
	| tr ',' '\n' | grep -E '"(status|finished_at|commit)"' | sed 's/^[[:space:]]*//'
