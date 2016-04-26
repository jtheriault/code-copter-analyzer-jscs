# JSCS Analyzer for Code-Copter

[![Build Status](https://travis-ci.org/jtheriault/code-copter-analyzer-jscs.svg)](https://travis-ci.org/jtheriault/code-copter-analyzer-jscs)

## Summary
Analyzer plugin for code-copter which uses JSCS.

## Usage
This plugin is included with the core Code-Copter package and doesn't need to be installed separately. However if you do install this separately (as a fork or to work around a lag updating the core package), this will take precedence.

### Installation

    npm install --save-dev code-copter code-copter-analyzer-jscs

### Configuration

spec/code-style.spec.js

    var codeCopter = require('code-copter');

    codeCopter.configure({
        analyzers: {
            jscs: true
        }
    });

    describe('Code Style', codeCopter);
