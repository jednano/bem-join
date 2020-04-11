# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-04-11)


### Bug Fixes

* package.json & .snyk to reduce vulnerabilities ([067f0c3](https://github.com/jedmao/bem-join/commit/067f0c31fcd65a207f41edcd1b836d1dc7068c0a))
* package.json to reduce vulnerabilities ([deec501](https://github.com/jedmao/bem-join/commit/deec50143d6d2f2c22511745dcd7205446b8c476))
* package.json, package-lock.json & .snyk to reduce vulnerabilities ([0bf5985](https://github.com/jedmao/bem-join/commit/0bf5985ffebd6c82cf7aea5bac8064111c351bf6))


### Features

* export bemJoin function instead of default export ([7db2c5e](https://github.com/jedmao/bem-join/commit/7db2c5e44d3f19897b31152c68bd3977eeff1157))


### BREAKING CHANGES

* removed default export; use import { bemJoin } from 'bem-join';

## v1.2.1

- Update dependencies (including security fixes).

## v1.2.0

- **New:** Exports a CommonJS module for npm compatibility.
- Switch tests to Jest.
- Snyk security fix.

## v1.1.4

- Snyk security fix.

## v1.1.3

- Add package-lock.json.
- Move snyk from dependency to dev dependency.
- Update dependencies.
- Specify `engines` in package.json.

## v1.1.2

- Fix README typo.

## v1.1.1

- Update npm keywords.

## v1.1.0

- Fix `BEMModifiers` type to an interface with optional values and document it in the README.

## v1.0.1

- Ignore (don't package) build-related files.

## v1.0.0

- Initial release.
