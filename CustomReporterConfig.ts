import { Reporter } from '@playwright/test/reporter';

class CustomReporterConfig implements Reporter {
  onBegin(config, suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test) {

    console.log(`Starting test ${test.title}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onStepBegin(test, result, step) {
    if (step.category === `test.step`) {
      console.log(`Started step ${step.title}`);
    }

  };

  onStepEnd(test, result, step) {
    if (step.category === `test.step`) {
      console.log(`Finished step ${step.title}`);
    }
  };

  onError(error): void {
    console.log(`Test Case failed with error : ${error.message}`);
  }

  onEnd(result) {
    console.log(`Finished the run: ${result.status}`);
  }
}
export default CustomReporterConfig;