const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
        serverUrl: 'http://localhost:9000',
        options: {
            'sonar.sources': 'src',
            // 'sonar.projectKey':'---',
            'sonar.projectName': 'final_case_study',
            'sonar.login': 'token',
            'sonar.tests': 'src',
            'sonar.inclusions': 'src/**/*.ts', // Entry point of source code
            'sonar.test.inclusions':
                'src/**/*.spec.ts,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
        },
    },
    (e) => {
        if(!e){
            console.log("Analysis is complete")
        }
    }
);
