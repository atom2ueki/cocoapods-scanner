# Cocoapods Scanner

## Description

Cocoapods Scanner is a powerful utility designed to streamline the process of managing dependencies in your iOS projects. It analyzes your project's `Podfile` and `Podfile.lock` to provide structured upgrade recommendations for your CocoaPods.

## Installation

Install Cocoapods Scanner via npm:

```bash
npm install --save cocoapods-scanner
```

## Usage
Initialize the CocoapodsScanner class with the paths to your Podfile and Podfile.lock:

```js
import CocoapodsScanner from 'cocoapods-scanner';

let scanner = new CocoapodsScanner('./Podfile', './Podfile.lock')

scanner.scan()
```

## Features
- Dependency Insight: Gain a comprehensive overview of your project's dependencies and their versions.
- Structured Recommendations: Receive clear and actionable suggestions for updating CocoaPods.
- Effortless Integration: Seamlessly integrate Cocoapods Scanner into your existing projects for hassle-free dependency management.

## Contributing
We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

## Tests
To run the test cases, install the dev dependency `jest`:

```bash
npm test
```

## License
This project is licensed under the ISC License.

```
This enhanced version provides a more detailed overview of the features, emphasizes the benefits of using Cocoapods Scanner, and includes a clearer section on contributing to the project. Feel free to customize it further based on your specific project details and goals.
```