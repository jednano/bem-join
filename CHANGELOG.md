# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/jedmao/bem-join/compare/v2.0.0...v2.0.1) (2020-04-28)


### Bug Fixes

* patch ([a65107d](https://github.com/jedmao/bem-join/commit/a65107d30e5cf04d0eb12e1a794bc80d5cb710c6))

# [2.0.0](https://github.com/jedmao/bem-join/compare/v1.2.1...v2.0.0) (2020-04-11)


### Features

* bump version ([b4fc10d](https://github.com/jedmao/bem-join/commit/b4fc10d594510b9d4db0c5ff0def8ba89415a6a4))
* export bemJoin function instead of default export ([7db2c5e](https://github.com/jedmao/bem-join/commit/7db2c5e44d3f19897b31152c68bd3977eeff1157))


### BREAKING CHANGES

* fix release
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
