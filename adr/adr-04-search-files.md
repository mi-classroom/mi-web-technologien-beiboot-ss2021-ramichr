# ADR-04 - Search files

## Status

Implemented

## Context

An algorithm is required to search in a large amount of files.

### Options

- Fuse.js

## Decision

- Fuse.js is chosen.

- Fusejs allow to perform a fuzzy search on the frontend side without assigning this task to the backend.

## Consequences

There sometimes where the search results does not match with the search pattern.
