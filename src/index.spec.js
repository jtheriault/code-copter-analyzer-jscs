'use strict';
describe('JSCS analyzer', function describeJscsAnalyzer () {
    var Analyzer = require('code-copter-sdk').Analyzer,
        Analysis = require('code-copter-sdk').Analysis,
        FileSourceData = require('code-copter-sdk').FileSourceData,
        fs = require('fs'),
        Jscs = require('jscs'),
        jscsAnalyzer = require('.');

    it('should export an analyzer', function shouldExportAnalyzer () {
        expect(jscsAnalyzer).toEqual(jasmine.any(Analyzer));
    });

    it('should produce an analysis from file source data', function analyze () {
        var testFileSourceData;

        testFileSourceData = new FileSourceData({
            text: 'test'
        }); 

        jscsAnalyzer.configure(true);
        expect(jscsAnalyzer.analyze(testFileSourceData)).toEqual(jasmine.any(Analysis));
    });

    describe('configuration', function describeConfiguration () {
        var fakeCheckStringResult,
            testConfiguration;

        beforeEach(function prepareTestData () {
            fakeCheckStringResult = {
                getErrorList: jasmine.createSpy('getErrorList').and.returnValue([])
            };

            testConfiguration = {
                fakeData: 'oh yeah'
            };

            spyOn(Jscs.prototype, 'configure');
            spyOn(Jscs.prototype, 'checkString').and.returnValue(fakeCheckStringResult);

            spyOn(fs, 'readFileSync');
        });

        it('should use the provided configuration', function configure () {
            jscsAnalyzer.configure(testConfiguration);
            jscsAnalyzer.analyze({});

            expect(Jscs.prototype.configure).toHaveBeenCalledWith(testConfiguration);
        });
        
        it('should error if provided configuration is false', function configure () {
            expect(function callConfigure () {
                jscsAnalyzer.configure(false);
            }).toThrow();
        });
        
        it('should use the configuration from jscsrc', function configure () {
            var mockCwd = '/house/luser',
                expectedPath = mockCwd + '/.jscsrc';

            spyOn(process, 'cwd').and.returnValue(mockCwd);
            fs.readFileSync.and.returnValue(JSON.stringify(testConfiguration));

            jscsAnalyzer.configure(true);
            jscsAnalyzer.analyze({});

            expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf8');
            expect(Jscs.prototype.configure).toHaveBeenCalledWith(testConfiguration);
        });

        it('should error for no configuration', function configure () {
            fs.readFileSync.and.throwError();
            
            expect(function callConfigure () {
                jscsAnalyzer.configure(true);
            }).toThrow();

            expect(fs.readFileSync).toHaveBeenCalled();
        });
    });
});
