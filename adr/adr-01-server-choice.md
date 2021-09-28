# ADR-01 - Server Choice

## Status

Implemented

## Context

A server is needed to handle the backend task like reading/writing image data as well as serving them to a client which will be needed to display these images.

### Options

- node.js
- Php

## Decision

Use node.js for the serverside.

## Consequences

- Easier to use.
- In the context of the client, which is also built in JS, it may make sense in terms of time to stay in a similar ecosystem.
- NodeJS requires a shorter training period for the developer concerned.
